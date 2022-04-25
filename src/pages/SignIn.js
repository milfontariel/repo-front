import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import useAuth from "../hooks/useAuth";
import Container from "../components/Container";
import LogoRepo from "../components/Logo";
import Title from "../components/TitleSign";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(true);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        if (email && password) {
            setActive(false);
        } else {
            setActive(true)
        }
    }, [password, email]);

    async function handleSignIn(e) {
        e.preventDefault();

        try {
            const userAuth = await api.signin(email, password);
            localStorage.setItem("userAuth", userAuth.data);
            setToken(userAuth.data);
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    /* async function logout(token) {
        try {
            await api.logout(token);
            localStorage.removeItem('userAuth');
            setToken(null);
        } catch (error) {
            console.log(error.response.data)
        }
    } */

    return (
        <Container>

            <Box
                component="form"
                onSubmit={handleSignIn}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '30vw',
                    width: '100%',
                    margin: '0 auto',
                    gap: '10px',
                    padding: '80px',
                    borderRadius: '10px',
                    backgroundColor: '#fff'
                }}
            >
                <LogoRepo></LogoRepo>
                <Title>Login</Title>
                <TextField
                    label="Email"
                    autoComplete="off"
                    variant="outlined"
                    required
                    size="small"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    required
                    size="small"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 0 0' }}>
                    <Button
                        sx={{ textTransform: 'initial', textDecoration: 'underline', padding: '0' }}
                        onClick={() => navigate('/signup')}
                    >
                        Não possui uma conta?
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={active}
                    >
                        Entrar
                    </Button>
                </Box>

            </Box >
        </Container>
    )
}