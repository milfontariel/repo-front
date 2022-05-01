import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import AddTest from './components/AddTest';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Main />} />
                    <Route path='/insert/test' element={<AddTest />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}