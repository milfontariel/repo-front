import axios from "axios";

const BASE_URL = "http://localhost:5001";

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export async function signup(email, password) {
    const data = { email, password };
    await axios.post(`${BASE_URL}/signup`, data);
}

export async function signin(email, password) {
    const data = { email, password };
    return await axios.post(`${BASE_URL}/signin`, data);
}

export async function logout(token) {
    const config = createConfig(token);
    await axios.get(`${BASE_URL}/logout`, config);
}

export async function get(token, search) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/tests?search=${search}`, config);
}

export async function view(token, id) {
    const config = createConfig(token);
    await axios.put(`${BASE_URL}/view/${id}`, {}, config);
}

export async function getCategories(token) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/categories/all`, config);
}
export async function getDisciplines(token) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/disciplines/all`, config);
}
export async function getTeachers(token, id) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/teachers/${id}`, config);
}
export async function postTest(token, data) {
    const config = createConfig(token);
    return await axios.post(`${BASE_URL}/tests`, data, config);
}