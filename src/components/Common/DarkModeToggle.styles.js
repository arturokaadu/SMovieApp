import styled from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 26px;
  cursor: pointer;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: inline-block;
    margin-right: 26px;
    margin-top: 10px;
  }
`;

export const ToggleSlot = styled.div`
  position: relative;
  height: 2em;
  width: 4em;
  border: 1px solid #e4e7ec;
  border-radius: 2em;
  background-color: ${({ $isDarkMode, theme }) => $isDarkMode ? theme.colors.surface : 'white'};
  box-shadow: 0px 10px 25px #e4e7ec;
  transition: background-color 250ms;
  overflow: hidden;
`;

export const ToggleButton = styled.div`
  transform: ${({ $isDarkMode }) => $isDarkMode ? 'translate(0.75em, 0.75em)' : 'translate(2.75em, 0.75em)'};
  position: absolute;
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#485367' : '#ffeccf'};
  box-shadow: ${({ $isDarkMode }) => $isDarkMode ? 'inset 0px 0px 0px 0.75em white' : 'inset 0px 0px 0px 0.75em #ffbb52'};
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
`;

export const IconWrapper = styled.div`
  position: absolute;
  height: 2em;
  width: 2em;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
  transform: ${({ $visible, $type }) => {
    if ($visible) {
      return 'translate(0.2em, 0.2em) rotate(15deg)';
    }
    return $type === 'sun'
      ? 'translate(-2em, 0) rotate(15deg)'
      : 'translate(2em, 0) rotate(0deg)';
  }};
`;

export const StyledIcon = styled.div`
  position: absolute;
  height: 1.5em;
  width: 1.5em;
  top: 0.25em;
  left: 0.25em;
  color: ${({ color }) => color};
  font-size: 1.5em;
`;
