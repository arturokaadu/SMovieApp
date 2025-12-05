import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { Icon } from '@iconify/react';
import {
    AuthContainer,
    AuthCard,
    Title,
    Form,
    FormGroup,
    Label,
    InputGroup,
    Input,
    Button,
    AuthLink,
    ErrorMessage
} from './Auth.styles';

export const ResetPasswordPage = () => {
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) return setError("Please enter your email");

        try {
            await resetPassword(email);
            setMessage("Check your inbox for further instructions");
            setError("");
        } catch (error) {
            setError(error.message);
            setMessage("");
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <Title>Reset Password</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {message && <div className="alert alert-success text-center">{message}</div>}

                <Form onSubmit={handleResetPassword}>
                    <FormGroup>
                        <Label>Email</Label>
                        <InputGroup>
                            <Icon icon="bi:envelope-fill" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </FormGroup>

                    <Button type="submit">
                        Reset Password
                    </Button>
                </Form>

                <AuthLink to="/login">
                    Back to Login
                </AuthLink>
            </AuthCard>
        </AuthContainer>
    );
};
