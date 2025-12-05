import styled from 'styled-components';
import { Icon } from '@iconify/react';

const SectionContainer = styled.div`
    margin-bottom: 3rem;
    padding: 0 1rem;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    h3 {
        margin: 0;
        color: #00d4ff;
        font-size: 1.5rem;
    }
`;

const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const NewsCard = styled.a`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.08);
        border-color: #00d4ff;
    }
`;

const ImageWrapper = styled.div`
    height: 160px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    ${NewsCard}:hover & img {
        transform: scale(1.05);
    }
`;

const Content = styled.div`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h4`
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Snippet = styled.p`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
`;

const DateMeta = styled.div`
    font-size: 0.8rem;
    color: #00d4ff;
    display: flex;
    align-items: center;
    gap: 0.3rem;
`;

export const NewsSection = ({ news }) => {
    if (!news || news.length === 0) return null;

    return (
        <SectionContainer>
            <Header>
                <Icon icon="bi:newspaper" style={{ color: '#00d4ff', fontSize: '1.5rem' }} />
                <h3>Latest News</h3>
            </Header>
            <NewsGrid>
                {news.map((item, index) => (
                    <NewsCard key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.images?.jpg?.image_url && (
                            <ImageWrapper>
                                <img src={item.images.jpg.image_url} alt={item.title} />
                            </ImageWrapper>
                        )}
                        <Content>
                            <Title>{item.title}</Title>
                            <Snippet>{item.excerpt}</Snippet>
                            <DateMeta>
                                <Icon icon="bi:calendar-event" />
                                {new Date(item.date).toLocaleDateString()}
                            </DateMeta>
                        </Content>
                    </NewsCard>
                ))}
            </NewsGrid>
        </SectionContainer>
    );
};
