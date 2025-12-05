import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* Scrollbar Customization */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Utility Classes (Migration Helpers) */
  .text-center { text-align: center; }
  .d-flex { display: flex; }
  .align-items-center { align-items: center; }
  .justify-content-center { justify-content: center; }
  .justify-content-between { justify-content: space-between; }
  .flex-column { flex-direction: column; }
  .w-100 { width: 100%; }
  .mb-3 { margin-bottom: 1rem; }
  .mt-3 { margin-top: 1rem; }
  .p-3 { padding: 1rem; }
`;
