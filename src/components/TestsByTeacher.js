import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TestsByTeacher({ data }) {

    function orderItems(data) {
        console.log(data)
        const hashByTeacher = {};
        for (let i = 0; i < data.length; i++) {
            if (!hashByTeacher[data[i].teacherDiscipline.teacher.name]) {
                hashByTeacher[data[i].teacherDiscipline.teacher.name] = { [data[i].category.name]: [data[i]] }
            } else {
                if (!hashByTeacher[data[i].teacherDiscipline.teacher.name][data[i].category.name]) {
                    hashByTeacher[data[i].teacherDiscipline.teacher.name][data[i].category.name] = [data[i]]
                } else {
                    hashByTeacher[data[i].teacherDiscipline.teacher.name][data[i].category.name].push(data[i]);
                }
            }
        }

        const teachers = Object.keys(hashByTeacher);
        const orderByTeachers = Array(teachers.length);
        for (let i = 0; i < teachers.length; i++) {
            const categories = Object.keys(hashByTeacher[teachers[i]]);
            orderByTeachers[i] = Array(categories.length);
            for (let j = 0; j < categories.length; j++) {
                orderByTeachers[i][j] = hashByTeacher[teachers[i]][categories[j]]
            }
        }
        return orderByTeachers;
    }
    const teachers = orderItems(data[0]);

    return (
        <>
            {teachers &&
                teachers.map(teacher => {
                    return (
                        <Accordion key={teacher[0][0].id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '100%' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    {teacher[0][0].teacherDiscipline.teacher.name}
                                </Typography>
                            </AccordionSummary>
                            {teacher.map(category => {
                                return (
                                    <Accordion>
                                        <AccordionDetails sx={{ padding: '8px 0 0 0px', borderRadius: '0' }}>
                                            <ul>
                                                <Accordion >
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: '8px 16px 8px 32px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                                            {category[0].category.name}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails sx={{ padding: '8px 48px 16px 48px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                                                        {category.map(test => {
                                                            return (
                                                                <Typography>
                                                                    <span>2022</span> - <a href={test.pdfUrl}>{test.name}</a> ({test.teacherDiscipline.discipline.name})
                                                                </Typography>
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