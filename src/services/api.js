import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export async function signup(email, password, repeatPassword) {
    const data = { email, password, repeatPassword };
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

export async function get(token) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/get`, config);
}