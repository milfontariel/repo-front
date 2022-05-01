import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import * as api from "../services/api"

export default function TestsByTerm({ data }) {

    function orderItems(data) {
        const hashByTerm = {};
        for (let i = 0; i < data.length; i++) {
            const item = data[i].teacherDiscipline;

            if (!hashByTerm[item.discipline.term.number]) {
                hashByTerm[item.discipline.term.number] = { [item.discipline.name]: [data[i]] };

            } else {
                if (!hashByTerm[item.discipline.term.number][item.discipline.name]) {
                    hashByTerm[item.discipline.term.number][item.discipline.name] = [data[i]]
                } else {
                    hashByTerm[item.discipline.term.number][item.discipline.name].push(data[i])
                }
            }
        }

        const terms = Object.keys(hashByTerm);
        const orderByTerm = Array(terms.length);
        for (let i = terms[0]; i <= terms[terms.length - 1]; i++) {
            if (!hashByTerm[i]) {
                continue
            }
            const disciplines = Object.keys(hashByTerm[i]);
            orderByTerm[i - 1] = Array(disciplines.length);
            for (let j = 0; j < disciplines.length; j++) {
                orderByTerm[i - 1][j] = hashByTerm[i][disciplines[j]]
            }
        }
        return orderByTerm;
    }

    async function putView(id, url) {
        window.open(url, '_blank');
        await api.view(localStorage.getItem('userAuth'), id);
    }

    const terms = orderItems(data[0]);
    return (
        <>
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
                                                                                    <ViewBox onClick={() => { putView(categ.id, categ.pdfUrl); categ.views++ }}>
                                                                                        <span>2022</span> - {categ.name} ({categ.teacherDiscipline.teacher.name}) | {categ.views} visualizações
                                                                                    </ViewBox>
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
        </>
    )
}

const ViewBox = styled.div`
    &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
`