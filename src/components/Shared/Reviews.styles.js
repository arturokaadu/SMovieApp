import styled from 'styled-components';

export const ReviewsContainer = styled.div`
    margin-top: 3rem;
    color: white;
`;

export const ReviewsHeader = styled.h3`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.text.primary};
`;

export const ReviewForm = styled.form`
    background: rgba(16, 18, 27, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    color: white;
    margin-bottom: 1rem;
    resize: vertical;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

export const SubmitButton = styled.button`
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        filter: brightness(1.1);
        transform: translateY(-2px);
    }
`;

export const ReviewCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
`;

export const ReviewText = styled.p`
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.6;
    margin-bottom: 1rem;
`;

export const LikeButton = styled.button`
    background: transparent;
    border: 1px solid ${props => props.$liked ? props.theme.colors.secondary : 'rgba(255,255,255,0.2)'};
    color: ${props => props.$liked ? props.theme.colors.secondary : 'rgba(255,255,255,0.6)'};
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
`;

export const StarContainer = styled.div`
    display: flex;
    gap: 2px;
    color: #fbbf24;
`;
