import { Base } from "../../../types";
import { Missiles } from "./BaseDashboard";
import { Button } from "../../../Components/Button";
import { Link } from "react-router-dom";

interface BaseCardProps {
  base: Base;
  missiles: Missiles;
}

function BaseCard(props: BaseCardProps) {
  return (
    <div key={props.base.name} className="bg-white p-4 rounded shadow mb-4 max-w-96">
      <h3 className="text-2xl font-bold mb-2">{props.base.name}</h3>
      <div>
        <h2 className="font-bold text-lg">Location: </h2>
        <p>Longitude: {props.base.location.longitude}</p>
        <p>Latitude: {props.base.location.latitude}</p>
      </div>
      <Link to={"/dashboard/base/"+ props.base.id}><Button>Details</Button></Link>
    </div>
  );
}

export default BaseCard;