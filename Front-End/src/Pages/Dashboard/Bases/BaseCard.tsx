import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

import { Base } from "../../../types";
import { Missiles } from "./BaseDashboard";
import { firestore } from "../../../firebase";

import { Button } from "../../../Components/Button";

interface BaseCardProps {
  base: Base;
  missiles: Missiles;
  onDelete: () => void;
}

function BaseCard(props: BaseCardProps) {
  const deleteBase = async () => {
    try {
      const baseRef = doc(firestore, "bases", props.base.id);
      deleteDoc(baseRef);
      props.onDelete();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div key={props.base.name} className="bg-white p-4 rounded shadow mx-4 w-1/4 min-w-72 ">
      <h3 className="text-2xl font-bold mb-2">{props.base.name}</h3>
      <div>
        <h2 className="font-bold text-lg">Location: </h2>
        <p>Longitude: {props.base.location.longitude}</p>
        <p>Latitude: {props.base.location.latitude}</p>
      </div>
      <div className="mt-4">
        <Link to={"/dashboard/base/"+ props.base.id}><Button className="bg-blue-500 hover:bg-blue-800">Details</Button></Link>
        <Button variant={"destructive"} className="hover:bg-red-600 ml-5" onClick={deleteBase}>Delete</Button>
      </div>
    </div>
  );
}

export default BaseCard;