import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
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
    Divider,
    AuthLink,
    ErrorMessage
} from './Auth.styles';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/internal-error") {
                setError("Invalid email or password");
            } else if (error.code === "auth/wrong-password") {
                setError("Invalid password");
            } else if (error.code === "auth/user-not-found") {
                setError("User not found");
            } else {
                setError("Failed to login");
            }
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <Title>Welcome Back</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Email</Label>
                        <InputGroup>
                            <Icon icon="bi:person-fill" />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label>Password</Label>
                        <InputGroup>
                            <Icon icon="bi:lock-fill" />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </FormGroup>

                    <Button type="submit">
                        Login
                    </Button>
                </Form>

                <Divider>
                    <span>OR</span>
                </Divider>

                <Button variant="outline" onClick={async () => {
                    try {
                        await loginWithGoogle();
                        navigate("/");
                    } catch (error) {
                        setError("Error logging in with Google");
                    }
                }}>
                    <Icon icon="bi:google" />
                    Login with Google
                </Button>

                <AuthLink to="/register">
                    Don't have an account? Register here
                </AuthLink>
                <AuthLink to="/resetPassword">
                    Forgot password? Reset here
                </AuthLink>
            </AuthCard>
        </AuthContainer>
    );
};
