import React from 'react'

import { useUser } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';

import GoogleLogin from '../../Components/GoogleLogin'

function Login() {
    const navigate = useNavigate();

    const user = useUser();
    if (user) {
        navigate('/dashboard');
    }

    return (
        <>
            <div>
                <h1>Login</h1>
            </div>

            <GoogleLogin />
        </>
    )
}

export default Login