import { Button } from "../../Components/Button";
import { useUser } from "../../contexts/UserContext"

function Home() {
  const user = useUser();

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
      <div className="text-xl flex justify-center flex-wrap w-full">
        <Button className="p-6 bg-blue-700 hover:bg-blue-900 m-5 text-xl max-w-96"><a href="https://linkedin.com/in/AbdullahBRashid" className="text-center">Visit the Creator at Linkedin</a></Button>
        <Button className="p-6 text-xl m-5 max-w-96"><a href="https://github.com/AbdullahBRashid" className="text-center">Visit the Creator at Github</a></Button>
      </div>
    </section>
  )
}

export default Home