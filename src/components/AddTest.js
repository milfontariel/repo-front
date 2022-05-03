import { LoadingButton } from "@mui/lab";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import * as api from "../services/api";

export default function AddTest() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [disciplines, setDisciplines] = useState([]);
    const [discipline, setDiscipline] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const { token } = useAuth();

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleChangeDiscipline = (event) => {
        setDiscipline(event.target.value);
    };
    const handleChangeTeacher = (event) => {
        setTeacher(event.target.value);
    };

    useEffect(() => {
        async function fetchCategories() {
            const { data } = await api.getCategories(token);
            setCategories(data.categories)
        }
        async function fetchDisciplines() {
            const { data } = await api.getDisciplines(token);
            setDisciplines(data.disciplines)
        }

        fetchCategories();
        fetchDisciplines();

    }, [token]);

    async function handlePostTest(e) {
        e.preventDefault();
        const data = {
            name,
            pdfUrl: url,
            categoryId: category,
            teacherDisciplineId: discipline,
            views: 0
        }
        try {
            await api.postTest(token, data);
            alert("created sucessfully");
            window.location.reload(false);
        } catch (error) {
            alert(error.response.data);
        }
    }

    useEffect(() => {
        async function fetchTeachers() {
            const { data } = await api.getTeachers(token, discipline);
            setTeachers(data.teachers);
        }
        if (discipline) {
            fetchTeachers();
        }
    }, [token, discipline])

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '70vw',
                width: '100%',
                margin: '0 auto',
                gap: '10px',
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '10px',
                boxSizing: "border-box",
                border: '2px solid #1976D2'
            }}
            onSubmit={e => handlePostTest(e)}
        >
            <TextField
                label="Título da prova"
                autoComplete="off"
                variant="outlined"
                required
                size="small"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                label="PDF da prova"
                autoComplete="off"
                variant="outlined"
                required
                size="small"
                fullWidth
                type={"url"}
                value={url}
                onChange={e => setUrl(e.target.value)}
            />
            <FormControl size='small' required>
                <InputLabel id="select-category">Categoria</InputLabel>
                <Select
                    labelId="select-category"
                    value={category}
                    label="Categoria"
                    onChange={handleChangeCategory}
                >
                    {categories.map(category => {
                        return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl size='small' required>
                <InputLabel id="select-discipline">Disciplina</InputLabel>
                <Select
                    labelId="select-discipline"
                    value={discipline}
                    label="Disciplina"
                    onChange={handleChangeDiscipline}
                >
                    {disciplines.map(discipline => {
                        return <MenuItem key={discipline.id} value={discipline.id}>{discipline.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl size='small' required disabled={!discipline}>
                <InputLabel id="select-teacher">Pessoa Instrutora</InputLabel>
                <Select
                    labelId="select-teacher"
                    value={teacher}
                    label="Pessoa Instrutora"
                    onChange={handleChangeTeacher}
                >
                    {teachers.map(teacher => {
                        return <MenuItem key={teacher.teacherId} value={teacher.teacherId}>{teacher.teacher.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <LoadingButton
                variant="contained"
                type="submit"
            >
                Enviar
            </LoadingButton>
        </Box >
    );
};