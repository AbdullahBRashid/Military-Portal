import { useEffect } from 'react'

import { useUser } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components/Button';

import GoogleLogin from '../../Components/GoogleLogin'

function Login() {
    const navigate = useNavigate();

    const user = useUser();

    useEffect( () => {
        if (user) {
            navigate('/dashboard');
        }
    })


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl my-10">Login</h1>

            <GoogleLogin />
        </div>
    )
}

export default Login