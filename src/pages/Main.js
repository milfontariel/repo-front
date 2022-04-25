import { useEffect, useState } from "react";
import Container from "../components/Container";
import * as api from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

export default function Main() {
    const [data, setData] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();
    const auth = localStorage.getItem('userAuth');
    useEffect(() => {
        if (!auth) {
            navigate('/signin');
        }
    }, [])

    async function getItems() {
        try {
            const dados = await api.get(auth);
            console.log(dados.data);
            setData(dados.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    function orderItems(data) {
        const hashByTerm = {};
        for (let i = 0; i < data.length; i++) {
            const item = data[i].teacherDiscipline.discipline;

            if (!hashByTerm[item.term.number]) {
                hashByTerm[item.term.number] = { [item.name]: [data[i]] };

            } else {
                if (!hashByTerm[item.term.number][item.name]) {
                    hashByTerm[item.term.number][item.name] = [data[i]]
                } else {
                    hashByTerm[item.term.number][item.name].push(data[i])
                }
            }
        }

        const terms = Object.keys(hashByTerm);
        const orderByTerm = Array(terms.length);
        for (let i = 1; i <= terms.length; i++) {
            const disciplines = Object.keys(hashByTerm[i]);
            orderByTerm[i - 1] = Array(disciplines.length);
            for (let j = 0; j < disciplines.length; j++) {
                orderByTerm[i - 1][j] = hashByTerm[i][disciplines[j]]
            }
        }
        console.log(orderByTerm);
        return orderByTerm;
    }

    const terms = orderItems(data);

    return (
        <Container>
            <button onClick={() => getItems()}>PUXAR</button>
            {/* {data ?
                <>
                    <h1>{data.teacherDiscipline.teacher.name}</h1>
                    <ul>
                        <li>
                            <h3>{data.category.name}</h3>
                            <ul>
                                <li>
                                    <span>2022</span> - <a href={data.pdfUrl}>{data.name}</a> ({data.teacherDiscipline.discipline.name})
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <br />
                    <h1>{data.teacherDiscipline.discipline.term.number}º Período</h1>
                    <ul>
                        <li>
                            <h3>{data.teacherDiscipline.discipline.name}</h3>
                            <ul>
                                <li>
                                    <h4>{data.category.name}</h4>
                                    <span>2022</span> - <a href={data.pdfUrl}>{data.name}</a> ({data.teacherDiscipline.teacher.name})
                                </li>
                            </ul>
                        </li>
                    </ul>
                </>
                : ''} */}
            <AccordionContainer>

                {terms &&
                    terms.map(term => {
                        return (
                            <Accordion key={term.id}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '100%' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                        {term[0][0].teacherDiscipline.discipline.term.number}º Período
                                    </Typography>
                                </AccordionSummary>
                                {term.map(discipline => {
                                    const categories = [];
                                    return (
                                        <Accordion>
                                            <AccordionDetails sx={{ padding: '8px 0 0 0px', borderRadius: '0' }}>
                                                <ul>
                                                    <Accordion >
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: '8px 16px 8px 32px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                                                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                                                {discipline[0].teacherDiscipline.discipline.name}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails sx={{ padding: '8px 48px 16px 48px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                                                            {discipline.map(test => {
                                                                if (!categories.includes(test.category.name)) {
                                                                    categories.push(test.category.name);
                                                                } else {
                                                                    return
                                                                }
                                                                return (
                                                                    <>
                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                                                            {test.category.name}
                                                                        </Typography>
                                                                        {discipline.map(categ => {
                                                                            if (categ.category.name === test.category.name) {

                                                                                return (
                                                                                    <Typography>
                                                                                        <span>2022</span> - <a href={categ.pdfUrl}>{categ.name}</a> ({categ.teacherDiscipline.teacher.name})
                                                                                    </Typography>
                                                                                )
                                                                            }
                                                                        })}
                                                                    </>
                                                                )
                                                            })}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </ul>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Accordion>
                        )
                    })
                }
            </AccordionContainer>
        </Container >
    )
}

const AccordionContainer = styled.div`
    width: 70vw;
`