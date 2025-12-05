import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
    ModalOverlay,
    ModalContent,
    ModalIcon,
    ModalTitle,
    ModalDescription,
    ButtonGroup,
    ConfirmButton,
    DeclineButton,
    BlurredContent
} from './NSFWModal.styles';

const NSFW_CONSENT_KEY = 'nsfw_age_verified';

export const NSFWModal = ({ isNSFW, children }) => {
    const [showModal, setShowModal] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        // Check localStorage on mount
        const stored = localStorage.getItem(NSFW_CONSENT_KEY);
        if (stored === 'true') {
            setHasConsented(true);
        } else if (isNSFW) {
            setShowModal(true);
        }
    }, [isNSFW]);

    const handleConfirm = () => {
        localStorage.setItem(NSFW_CONSENT_KEY, 'true');
        setHasConsented(true);
        setShowModal(false);
    };

    const handleDecline = () => {
        window.location.href = '/';
    };

    // If not NSFW content, just render children
    if (!isNSFW) {
        return <>{children}</>;
    }

    // If consented, render normally
    if (hasConsented) {
        return <>{children}</>;
    }

    // Show modal and blurred content
    return (
        <>
            <BlurredContent blur={showModal}>
                {children}
            </BlurredContent>

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalIcon>⚠️</ModalIcon>
                        <ModalTitle>Age Verification Required</ModalTitle>
                        <ModalDescription>
                            This content is intended for mature audiences only.
                            <br /><br />
                            By clicking "I'm 18+", you confirm that you are at least 18 years old
                            and wish to view adult content.
                        </ModalDescription>
                        <ButtonGroup>
                            <ConfirmButton onClick={handleConfirm}>
                                <Icon icon="bi:check-circle" style={{ marginRight: '0.5rem' }} />
                                I'm 18+
                            </ConfirmButton>
                            <DeclineButton onClick={handleDecline}>
                                <Icon icon="bi:x-circle" style={{ marginRight: '0.5rem' }} />
                                Exit
                            </DeclineButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};
