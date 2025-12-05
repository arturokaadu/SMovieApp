import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 12, 21, 0.95);
  backdrop-filter: blur(15px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 50px rgba(239, 68, 68, 0.2);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ConfirmButton = styled(Button)`
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);

  &:hover {
    background: #dc2626;
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

export const AgeVerificationModal = ({ onVerify }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <Overlay>
      <ModalCard>
        <Title>
          <Icon icon="bi:exclamation-triangle-fill" />
          Age Restricted
        </Title>
        <Description>
          This section contains content that is restricted to users 18 years of age or older.
          <br /><br />
          By entering, you confirm that you are at least 18 years old.
        </Description>

        <ButtonGroup>
          <CancelButton onClick={handleExit}>
            <Icon icon="bi:arrow-left" />
            I am under 18 - Exit
          </CancelButton>
          <ConfirmButton onClick={onVerify}>
            <Icon icon="bi:check-lg" />
            I am 18+ - Enter
          </ConfirmButton>
        </ButtonGroup>
      </ModalCard>
    </Overlay>
  );
};
