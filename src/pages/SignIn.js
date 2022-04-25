import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import useAuth from "../hooks/useAuth";
import Container from "../components/Container";
import LogoRepo from "../components/Logo";
import Title from "../components/TitleSign";
import { LoadingButton } from "@mui/lab";
export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        if (localStorage.getItem('userAuth')) {
            navigate('/')
        }
        if (email && password) {
            setActive(false);
        } else {
            setActive(true)
        }
    }, [password, email]);

    async function handleSignIn(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const userAuth = await api.signin(email, password);
            localStorage.setItem("userAuth", userAuth.data);
            setToken(userAuth.data);
            navigate('/');

        } catch (error) {
            loginError(error.response.data)
        }
    }

    function loginError(err) {
        setTimeout(() => {
            setLoading(false)
            alert(err)
        }, 1000);
    }

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
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        type="submit"
                        disabled={active}
                    >
                        Entrar
                    </LoadingButton>
                </Box>

            </Box >
        </Container>
    )
}