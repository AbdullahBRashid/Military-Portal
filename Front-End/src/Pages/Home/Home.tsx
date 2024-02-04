import { Button } from "../../Components/Button";
import {FaLinkedin, FaGithub} from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

function Home() {

  let user = useUser();

  return (
      
    <section className="pt-10 display flex flex-col items-center flex-wrap">
      <h1 className="text-5xl font-extrabold mb-8 text-center">
        Welcome to the Military Control Panel!
      </h1>
      <p className="text-xl p-5 self-start">
        This is a simple web app that allows you to manage your military
        units. You can add, edit, and delete units. You can also view
        information about each unit.
      </p>
      <p className="text-xl p-5 self-start">
        Just a portfolio project to show off my skills. I hope you enjoy it!
      </p>
      <p className="text-xl p-5 self-start">
        - Abdullah B. Rashid
      </p>

      {user ?
        <p className="text-lg">
          You are logged in as {user.displayName}
        </p>
          :
        <p className="text-lg">
          To get started, login with your google account.
        </p>
      }
      <div className="text-xl flex justify-center flex-wrap w-full mt-10">
        <Button className="p-6 bg-blue-700 hover:bg-blue-900 m-5 text-xl max-w-96">
          <a href="https://linkedin.com/in/AbdullahBRashid" className="text-center flex items-center">
            <p className="mr-4">Visit me at LinkedIn</p> <FaLinkedin/>
          </a>
        </Button>
        <a href="https://github.com/AbdullahBRashid" className="text-center">
          <Button className="p-6 text-xl m-5 max-w-96">
              <p className="mr-4">Visit me at Github</p> <FaGithub/>
          </Button>
        </a>
      </div>
    </section>
  )
}

export default Home