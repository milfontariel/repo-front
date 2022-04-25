import { useEffect, useState } from "react";
import Container from "../components/Container";
import * as api from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TestsByTerm from "../components/TestsByTerm";
import TestsByTeacher from "../components/TestsByTeacher";
import { Button } from "@mui/material";

export default function Main() {
    const [data, setData] = useState('');
    const [active, setActive] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();
    const auth = localStorage.getItem('userAuth');
    useEffect(() => {
        if (!auth) {
            navigate('/signin');
        }
        getItems();
    }, [])

    async function getItems() {
        try {
            const dados = await api.get(auth);
            setData(dados.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <Container>
            {data &&
                <AccordionContainer>
                    <ContainerButtons>
                        <Button variant='contained' sx={{ backgroundColor: active ? '#fff' : '', color: active ? '#1976D2' : '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }} onClick={() => setActive(true)}>Período</Button>
                        <Button variant='contained' sx={{ backgroundColor: !active ? '#fff' : '', color: !active ? '#1976D2' : '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }} onClick={() => setActive(false)}>Pessoa Instrutora</Button>
                        <Button variant="contained" sx={{ color: '#fff', border: '1px solid #fff', '&:hover': { color: '#fff' } }}>Adicionar</Button>
                    </ContainerButtons>
                    <ChoiceBox display={!active}>
                        <TestsByTerm data={data}></TestsByTerm>
                    </ChoiceBox>
                    <ChoiceBox display={active}>
                        <TestsByTeacher data={data}></TestsByTeacher>
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
    display: ${props => props.display ? 'none' : 'block'};
`

const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`