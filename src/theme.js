export const theme = {
    colors: {
        background: '#0b0c15', // Deep Space Black
        surface: '#151f2e',    // Dark Blue/Grey for cards
        primary: '#00d4ff',    // Neon Cyan
        secondary: '#ff0055',  // Neon Magenta
        text: {
            primary: '#e0e6ed',  // White Smoke
            secondary: '#94a3b8', // Light Grey
            accent: '#ffd700',   // Gold (for stars/ratings)
        },
        status: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },
        gradients: {
            primary: 'linear-gradient(135deg, #00d4ff 0%, #0056b3 100%)',
            secondary: 'linear-gradient(135deg, #ff0055 0%, #ff5500 100%)',
            dark: 'linear-gradient(to bottom, rgba(11, 12, 21, 0) 0%, #0b0c15 100%)',
        }
    },
    fonts: {
        main: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        heading: "'Poppins', 'Montserrat', sans-serif",
    },
    breakpoints: {
        mobile: '576px',
        tablet: '768px',
        desktop: '992px',
        wide: '1200px',
    },
    shadows: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        glow: '0 0 15px rgba(0, 212, 255, 0.3)',
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '16px',
        round: '50%',
    }
};

export const lightTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        background: '#f8fafc',      // Light grey-blue
        surface: '#ffffff',         // Pure white
        cardBackground: '#ffffff',  // Card background
        primary: '#0891b2',         // Darker cyan for better contrast
        secondary: '#dc2626',       // Darker pink/red for better contrast
        text: {
            primary: '#0f172a',     // Almost black for text
            secondary: '#475569',   // Dark grey for secondary text
            accent: '#d97706',      // Amber for accents
        },
        status: {
            success: '#059669',
            warning: '#d97706',
            error: '#dc2626',
            info: '#2563eb',
        },
        gradients: {
            primary: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
            secondary: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            dark: 'linear-gradient(to bottom, rgba(248, 250, 252, 0) 0%, #f8fafc 100%)',
        }
    }
};
