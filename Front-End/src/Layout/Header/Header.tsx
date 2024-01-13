import { Link } from "react-router-dom";
import { Button } from "../../Components/Button";
import { useUser } from "../../contexts/UserContext"

function Header() {
    const user = useUser();

    return (
        <header className="bg-black flex justify-between px-10 py-5 items-center">
            <div className="flex items-center">
                <img src={user?.photoURL as string} alt="User Image" className="rounded-full h-15" />
                <Link to="/">
                    <h2 className="text-gray-300 hover:text-white hover:underline ml-10">Military Portal</h2>
                </Link>
            </div>
            <div>
                {user ? (
                    <div className="flex flex-col items-center">
                        <p className="text-white text-xs mb-2">{user.displayName}</p>
                        <Link to="/dashboard"><Button className="hover:bg-gray-600">Dashboard</Button></Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login"><Button>Login</Button></Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header