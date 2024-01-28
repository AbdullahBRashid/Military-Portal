import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext"
import { auth } from '../../firebase'

import { Button } from "../../Components/Button";
import { useEffect } from "react";

function Header() {
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user?.role);
    })

    return (
        <header className="bg-black flex justify-center px-6 py-3 items-center flex-wrap flex-col sm:justify-between sm:flex-row sm:py-5 sm:px-10">
            <div className="flex items-center">
                {/* <img src={user?.photoURL as string} alt="User Image" className="rounded-full h-15" /> */}
                <Link to="/">
                    <h2 className="text-gray-300 hover:text-white hover:underline">Military Portal</h2>
                </Link>
            </div>
            {user ? (
                <>
                    <div>
                        <Link to="/dashboard"><Button className="hover:bg-gray-600 mr-2">Dashboard</Button></Link>
                        <Button className="hover:bg-gray-600" onClick={ () => {
                            auth.signOut();
                            navigate("/");
                        }}>Sign Out</Button>
                    </div>
                    <div className='items-center hidden sm:flex'>
                        <p className="text-white text-xs mr-2">{user.displayName}</p>
                        <img src={user?.photoURL as string} alt="User Image" className="rounded-full h-8" />
                    </div>
                </>
            ) : (
                <div>
                    <Link to="/login"><Button>Login</Button></Link>
                </div>
            )}
        </header>
    )
}

export default Header