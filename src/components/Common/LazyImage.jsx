import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 0%,
    rgba(255,255,255,0.1) 50%,
    rgba(255,255,255,0.05) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ErrorPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.cardBackground} 0%, 
    rgba(0,212,255,0.1) 100%
  );
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
`;

/**
 * LazyImage component with:
 * - Native lazy loading
 * - IntersectionObserver for preloading
 * - Skeleton placeholder
 * - Error handling with fallback
 * - Smooth transition on load
 */
export const LazyImage = ({
    src,
    alt,
    fallbackSrc = null,
    className = '',
    onLoad,
    onError,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const imgRef = useRef(null);

    // Reset state when src changes
    useEffect(() => {
        setLoaded(false);
        setError(false);
        setCurrentSrc(src);
    }, [src]);

    // Preload image using IntersectionObserver
    useEffect(() => {
        if (!imgRef.current || !currentSrc) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Preload image
                        const img = new Image();
                        img.src = currentSrc;
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '100px' } // Start loading 100px before visible
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, [currentSrc]);

    const handleLoad = (e) => {
        setLoaded(true);
        onLoad?.(e);
    };

    const handleError = (e) => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setLoaded(false);
        } else {
            setError(true);
        }
        onError?.(e);
    };

    if (error || !currentSrc) {
        return (
            <ImageWrapper className={className} {...props}>
                <ErrorPlaceholder>
                    📺<br />No Preview
                </ErrorPlaceholder>
            </ImageWrapper>
        );
    }

    return (
        <ImageWrapper ref={imgRef} className={className} {...props}>
            {!loaded && <Skeleton />}
            <StyledImage
                src={currentSrc}
                alt={alt}
                loading="lazy"
                $loaded={loaded}
                onLoad={handleLoad}
                onError={handleError}
            />
        </ImageWrapper>
    );
};

export default LazyImage;
