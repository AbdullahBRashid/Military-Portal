import { Missile } from "../../../types"
import { Button } from "../../../Components/Button";
import { Link } from "react-router-dom";

interface MissileCardProps {
    missile: Missile;
}

function MissileCard(props: MissileCardProps) {
  let missile = props.missile;
  return (
    <div className="max-w-72 w-screen h-100 m-10 shadow-lg p-5 rounded-2xl">
        <h3 className="font-bold text-2xl mb-4 text-center">{missile.name}</h3>
        <div className="m-3">
            <p><b>Production Cost:</b> {missile.productionCost}</p>
            <p><b>Launch Cost:</b> {missile.launchCost}</p>
            <p><b>Blast Radius Cost:</b> {missile.blastRadius}</p>
            <p><b>Range:</b> {missile.range}</p>
        </div>
        <Link to={"/dashboard/missile/" + missile.id}><Button>Details</Button></Link>
    </div>
  )
}

export default MissileCard