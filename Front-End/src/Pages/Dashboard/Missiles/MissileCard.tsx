import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

import { Missile } from "../../../types"
import { firestore } from "../../../firebase";

import { Button } from "../../../Components/Button";

interface MissileCardProps {
    missile: Missile;
    onDelete: () => void;
}

function MissileCard(props: MissileCardProps) {
  const deleteMissile = async () => {
    try {
      const missileRef = doc(firestore, "missiles", props.missile.id);
      deleteDoc(missileRef);
      props.onDelete();
    } catch (err) {
      console.error(err);
    }
  }

  let missile = props.missile;
  return (
    <div className="max-w-72 w-screen h-100 m-5 shadow-lg p-5 rounded-2xl md:m-7 lg:m-10">
        <h3 className="font-bold text-2xl mb-4 text-center">{missile.name}</h3>
        <div className="m-3">
            <p><b>Production Cost:</b> {missile.productionCost}</p>
            <p><b>Launch Cost:</b> {missile.launchCost}</p>
            <p><b>Blast Radius:</b> {missile.blastRadius}</p>
            <p><b>Range:</b> {missile.range}</p>
        </div>
        <Link to={"/dashboard/missile/" + missile.id}><Button className="bg-blue-500 hover:bg-blue-800">Details</Button></Link>
        <Button variant={"destructive"} className="hover:bg-red-600 ml-5" onClick={deleteMissile}>Delete</Button>
    </div>
  )
}

export default MissileCard