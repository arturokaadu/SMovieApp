import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { searchCharacters } from "../../services/animeService";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import {
    Container,
    ProfileHeader,
    LogoutButton,
    Section,
    Card,
    CardTitle,
    SettingRow,
    SettingInfo,
    SearchForm,
    SearchInput,
    SearchButton,
    Grid,
    CharacterCard,
    CharacterImage,
    CharacterName,
    RemoveButton,
    RankBadge
} from './ProfilePage.styles';

export const ProfilePage = () => {
    const { user, logout, isAdult, updateUserSettings } = useAuth();
    const navigate = useNavigate();
    const [topCharacters, setTopCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                navigate("/login");
                return;
            }
            setLoading(true);
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTopCharacters(docSnap.data().topCharacters || []);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearching(true);
        try {
            const data = await searchCharacters(searchQuery);
            setSearchResults(data.data);
        } catch (error) {
            console.error("Error searching characters:", error);
            toast.error("Could not search characters");
        } finally {
            setSearching(false);
        }
    };

    const addCharacter = async (char) => {
        if (topCharacters.length >= 50) {
            toast.error("You can only have 50 characters in your top list.");
            return;
        }
        if (topCharacters.find(c => c.mal_id === char.mal_id)) {
            toast.error("This character is already in your list.");
            return;
        }

        const newChar = {
            mal_id: char.mal_id,
            name: char.name,
            image_url: char.images.jpg.image_url
        };

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                topCharacters: arrayUnion(newChar)
            });
            setTopCharacters([...topCharacters, newChar]);
            toast.success(`${char.name} added to your top list.`);
            setSearchResults([]);
            setSearchQuery("");
        } catch (error) {
            console.error("Error adding character:", error);
            toast.error("Could not add character");
        }
    };

    const removeCharacter = async (char) => {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                topCharacters: arrayRemove(char)
            });
            setTopCharacters(topCharacters.filter(c => c.mal_id !== char.mal_id));
            toast.success(`${char.name} removed from your list.`);
        } catch (error) {
            console.error("Error removing character:", error);
            toast.error("Could not remove character");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#00d4ff' }}>
            <Icon icon="eos-icons:loading" width="60" />
        </div>
    );

    return (
        <Container>
            <ProfileHeader>
                <h1>My Profile</h1>
                <p>Welcome, {user?.username || user?.email}</p>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </ProfileHeader>

            {/* NSFW Settings Section */}
            {user?.dob && (
                <Section>
                    <Card>
                        <CardTitle>Content Settings</CardTitle>
                        <SettingRow>
                            <SettingInfo>
                                <strong>Show NSFW Content</strong>
                                <p>
                                    {isAdult(user.dob)
                                        ? "You can toggle sensitive content visibility"
                                        : "Available for users 18+"}
                                </p>
                            </SettingInfo>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="nsfwToggle"
                                    checked={user?.settings?.showNSFW || false}
                                    onChange={async (e) => {
                                        if (!isAdult(user.dob)) {
                                            toast.error("You must be 18+ to enable this setting");
                                            return;
                                        }
                                        await updateUserSettings({ showNSFW: e.target.checked });
                                        toast.success(`NSFW content ${e.target.checked ? 'enabled' : 'disabled'}`);
                                    }}
                                    disabled={!isAdult(user.dob)}
                                    style={{ cursor: isAdult(user.dob) ? 'pointer' : 'not-allowed' }}
                                />
                            </div>
                        </SettingRow>
                    </Card>
                </Section>
            )}

            {/* Top 50 Characters Section */}
            <Section>
                <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    My Top 50 Characters ({topCharacters.length}/50)
                </h3>

                {/* Search to Add */}
                <Card style={{ marginBottom: '2rem' }}>
                    <CardTitle>Add Character</CardTitle>
                    <SearchForm onSubmit={handleSearch}>
                        <SearchInput
                            type="text"
                            placeholder="Search character name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchButton type="submit" disabled={searching}>
                            {searching ? "Searching..." : "Search"}
                        </SearchButton>
                    </SearchForm>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <Grid>
                            {searchResults.map(char => (
                                <CharacterCard key={char.mal_id} onClick={() => addCharacter(char)}>
                                    <CharacterImage src={char.images.jpg.image_url} alt={char.name} />
                                    <CharacterName>{char.name}</CharacterName>
                                </CharacterCard>
                            ))}
                        </Grid>
                    )}
                </Card>

                {/* List Display */}
                <Grid>
                    {topCharacters.length > 0 ? (
                        topCharacters.map((char, index) => (
                            <CharacterCard key={char.mal_id}>
                                <RankBadge>#{index + 1}</RankBadge>
                                <RemoveButton onClick={(e) => {
                                    e.stopPropagation();
                                    removeCharacter(char);
                                }}>
                                    <Icon icon="bi:x" />
                                </RemoveButton>
                                <CharacterImage src={char.image_url} alt={char.name} />
                                <CharacterName>{char.name}</CharacterName>
                            </CharacterCard>
                        ))
                    ) : (
                        <p style={{ color: 'rgba(255,255,255,0.5)', gridColumn: '1/-1', textAlign: 'center' }}>
                            No characters added yet. Search and add your favorites!
                        </p>
                    )}
                </Grid>
            </Section>
        </Container>
    );
};
