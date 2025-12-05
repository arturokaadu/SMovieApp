import { Icon } from '@iconify/react';
import { ToggleContainer, ToggleSlot, ToggleButton, IconWrapper, StyledIcon } from './DarkModeToggle.styles';

const DarkModeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme} role="button" tabIndex={0} aria-label="Toggle Dark Mode">
      <ToggleSlot $isDarkMode={isDarkMode}>
        <IconWrapper $visible={!isDarkMode} $type="sun">
          <StyledIcon as={Icon} icon="feather:sun" color="#ffbb52" />
        </IconWrapper>
        <ToggleButton $isDarkMode={isDarkMode} />
        <IconWrapper $visible={isDarkMode} $type="moon">
          <StyledIcon as={Icon} icon="feather:moon" color="white" />
        </IconWrapper>
      </ToggleSlot>
    </ToggleContainer>
  );
};

export default DarkModeToggle;
