import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Title from "../components/TitleSign";
import * as api from "../services/api";

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (repeatPassword !== password) {
            setError(true);
        } else {
            setError(false);
        }
        if (email && password && repeatPassword && repeatPassword === password) {
            setActive(false);
        } else {
            setActive(true)
        }
    }, [repeatPassword, password, email]);

    async function handleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.signup(email, password);
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        } catch (error) {
            signUpError(error.response.data)
        }
    }

    function signUpError(err) {
        setTimeout(() => {
            setLoading(false);
            alert(err);
        }, 1000);
    }

    return (
        <Container>
            <Box
                component="form"
                onSubmit={handleSignUp}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '30vw',
                    width: '100%',
                    margin: '0 auto',
                    gap: '10px',
                    backgroundColor: '#fff',
                    padding: '80px',
                    borderRadius: '10px',
                }}
            >
                <Logo src={Logo} alt='logo' />
                <Title>Cadastro</Title>
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
                <TextField
                    label="Confirme sua senha"
                    variant="outlined"
                    required
                    size="small"
                    type="password"
                    fullWidth
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    error={error}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 0 0', alignContent: 'center' }}>
                    <Button
                        sx={{ textTransform: 'initial', textDecoration: 'underline', padding: '0' }}
                        onClick={() => navigate('/signin')}
                    >
                        Já possui uma conta?
                    </Button>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        type="submit"
                        disabled={active}
                    >
                        Cadastrar
                    </LoadingButton>
                </Box>

            </Box >
        </Container>
    )
}

