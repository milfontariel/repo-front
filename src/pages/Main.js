import { useEffect, useState } from "react";
import Container from "../components/Container";
import * as api from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TestsByTerm from "../components/TestsByTerm";
import TestsByTeacher from "../components/TestsByTeacher";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import LogoRepo from "../components/Logo";
import AddTest from "../components/AddTest";


export default function Main() {
    const [data, setData] = useState('');
    const { token } = useAuth();
    const [search, setSearch] = useState('');
    const [get, setGet] = useState(false);
    const navigate = useNavigate();
    const auth = localStorage.getItem('userAuth');
    const [display, setDisplay] = useState('terms');

    useEffect(() => {
        if (!auth) {
            navigate('/signin');
        }
        getItems();
    }, [get])

    async function getItems() {
        try {
            const dados = await api.get(auth, search);
            setData(dados.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function logout() {
        try {
            await api.logout(localStorage.getItem('userAuth'));
            localStorage.removeItem('userAuth');
            window.location.reload(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Container>
            <LogoRepo width='20%'></LogoRepo>
            <Paper
                sx={{ p: "2px 4px", display: display === 'add' ? 'none' : 'flex', alignItems: "center", width: '70vw', marginBottom: '40px' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={display === 'terms' ? 'Pesquise por disciplina' : 'Pesquise por pessoa instrutora'}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" onClick={() => setGet(!get)}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Exit onClick={() => logout(token)}>
                <LogoutIcon></LogoutIcon>
            </Exit>
            {data &&
                <AccordionContainer>
                    <ContainerButtons>
                        <Button variant='contained' sx={{ backgroundColor: display === 'terms' ? '#fff' : '', color: display === 'terms' ? '#1976D2' : '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }} onClick={() => setDisplay('terms')}>Período</Button>
                        <Button variant='contained' sx={{ backgroundColor: display === 'teachers' ? '#fff' : '', color: display === 'teachers' ? '#1976D2' : '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }} onClick={() => setDisplay('teachers')}>Pessoa Instrutora</Button>
                        <Button variant="contained" sx={{ backgroundColor: display === 'add' ? '#fff' : '', color: display === 'add' ? '#1976D2' : '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }} onClick={() => setDisplay('add')}>Adicionar</Button>
                    </ContainerButtons>
                    <ChoiceBox>
                        {display === 'terms'
                            ? <TestsByTerm data={data}></TestsByTerm>
                            : display === 'teachers'
                                ? <TestsByTeacher data={data}></TestsByTeacher>
                                : <AddTest></AddTest>
                        }
                    </ChoiceBox>
                </AccordionContainer>
            }
        </Container >
    )
}

const AccordionContainer = styled.div`
    width: 70vw;
`

const ChoiceBox = styled.div`
`

const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Exit = styled.div`
    position: absolute;
    top: 50px;
    right: 15vw;
    background-color: #1976D2;
    box-shadow: 0px 5px 5px 2px rgba(0,0,0,.2);
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: #fff;
        color: #1976D2;
    }
`