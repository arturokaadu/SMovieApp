import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import {
    AuthContainer,
    AuthCard,
    Title,
    Form,
    FormGroup,
    Label,
    InputGroup,
    Input,
    Button,
    Divider,
    AuthLink,
    ErrorMessage
} from './Auth.styles';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { signUp, loginWithGoogle } = useAuth();
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        dob: "",
        showNSFW: false
    });
    const [isOver18, setIsOver18] = useState(false);

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = ({ target: { name, value, type, checked } }) => {
        const newValue = type === 'checkbox' ? checked : value;

        if (name === 'dob') {
            const age = calculateAge(value);
            setIsOver18(age >= 18);
            if (age < 18) {
                setUser(prev => ({ ...prev, [name]: value, showNSFW: false }));
            } else {
                setUser(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setUser({ ...user, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await signUp(user.email, user.password, user.username, user.dob, user.showNSFW);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthContainer>
            <AuthCard style={{ maxWidth: '600px' }}>
                <Title>Create Account</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormGroup>
                            <Label>Username</Label>
                            <InputGroup>
                                <Icon icon="bi:person-fill" />
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Email</Label>
                            <InputGroup>
                                <Icon icon="bi:envelope-fill" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Label>Date of Birth</Label>
                        <InputGroup>
                            <Icon icon="bi:calendar-date" />
                            <Input
                                type="date"
                                name="dob"
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </FormGroup>

                    {isOver18 && (
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="checkbox"
                                name="showNSFW"
                                id="nsfwCheck"
                                checked={user.showNSFW}
                                onChange={handleChange}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <Label htmlFor="nsfwCheck" style={{ marginBottom: 0 }}>Show NSFW Content (18+)</Label>
                        </FormGroup>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormGroup>
                            <Label>Password</Label>
                            <InputGroup>
                                <Icon icon="bi:lock-fill" />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <InputGroup>
                                <Icon icon="bi:lock-fill" />
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm"
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <Button type="submit">
                        Register
                    </Button>
                </Form>

                <Divider>
                    <span>OR</span>
                </Divider>

                <Button variant="outline" onClick={async () => {
                    try {
                        await loginWithGoogle();
                        navigate("/");
                    } catch (error) {
                        setError("Error logging in with Google");
                    }
                }}>
                    <Icon icon="bi:google" />
                    Sign up with Google
                </Button>

                <AuthLink to="/login">
                    Already have an account? Login here
                </AuthLink>
            </AuthCard>
        </AuthContainer>
    );
};
