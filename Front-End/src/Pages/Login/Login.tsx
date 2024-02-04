import { useEffect } from 'react'

import { useUser } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';

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
        <div className="flex items-center justify-center flex-col mt-auto">
            <h1 className='mt-10 mb-40 text-4xl'>Login</h1>
            <GoogleLogin />
        </div>
    )
}

export default Login