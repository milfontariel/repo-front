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
    const [alert, setAlert] = useState(false);
    const [active, setActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (repeatPassword !== password) {
            setAlert(true);
        } else {
            setAlert(false);
        }
        if (email && password && repeatPassword && repeatPassword === password) {
            setActive(false);
        } else {
            setActive(true)
        }
    }, [repeatPassword, password, email]);

    async function handleSignUp(e) {
        e.preventDefault();

        try {
            await api.signup(email, password, repeatPassword);
            console.log("created")
        } catch (error) {
            console.log(error.response.data);
        }
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
                    error={alert}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 0 0', alignContent: 'center' }}>
                    <Button
                        sx={{ textTransform: 'initial', textDecoration: 'underline', padding: '0' }}
                        onClick={() => navigate('/signin')}
                    >
                        Já possui uma conta?
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={active}
                    >
                        Cadastrar
                    </Button>
                </Box>

            </Box >
        </Container>
    )
}

