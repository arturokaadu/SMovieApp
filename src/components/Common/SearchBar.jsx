import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { SearchContainer, Select, InputGroup, Input, SearchButton } from './SearchBar.styles';

export const SearchBar = () => {
    const navigate = useNavigate();
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length < 2) {
            toast.error("You must write a keyword");
        } else {
            e.currentTarget.keyword.value = "";
            let url = `/resultados?keyword=${encodeURIComponent(keyword)}`;
            if (type) {
                url += `&type=${type}`;
            }
            navigate(url);
        }
    };

    return (
        <SearchContainer onSubmit={handleSubmit}>
            <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">All</option>
                <option value="tv">TV Series</option>
                <option value="movie">Movies</option>
                <option value="ova">OVA</option>
            </Select>

            <InputGroup>
                <Input
                    type="text"
                    name="keyword"
                    placeholder="Search Anime..."
                    autoComplete="off"
                />
                <SearchButton type="submit">
                    <Icon icon="bi:search" />
                </SearchButton>
            </InputGroup>
        </SearchContainer>
    );
};
