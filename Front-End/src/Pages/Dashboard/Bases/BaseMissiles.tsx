import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Base, Missile, MissileStorage } from "../../../types";

import EditableField from "../../../Components/EditableField";
import MissileBox from "./MissileBox";
import { useBase } from "./baseContext";

function BaseMissiles(props: { onEdit: (missiles: MissileStorage[]) => void, onCancel: any }) {
  const [displayMissiles, setDisplayMissiles] = useState<
    { missile: Missile; quantity: number }[]
  >([]);

  const [showMissileForm, setShowMissileForm] = useState(false);
  let base = useBase() as Base;

  useEffect(() => {
    const fetchMissiles = async () => {
      const newDisplayMissiles: { missile: Missile; quantity: number }[] = [];

      console.log(base.missiles);
       if(base.missiles && base.missiles.length != 0)
        for (const missileStor of base.missiles) {
          const doc = await getDoc(missileStor.missile);

          if (doc.exists()) {
              let data = doc.data();
              data.id = doc.id;
              newDisplayMissiles.push({
                  missile: data as Missile,
                  quantity: missileStor.quantity,
              });
          }
        }

        setDisplayMissiles(newDisplayMissiles);
    };

    fetchMissiles();
  }, [base.missiles]);
    

  return (
    <div className="shadow-md min-h-96 p-10">
      <h2 className="text-2xl font-bold mb-4">Missiles</h2>
      <ul className="list-none list-inside">
        {displayMissiles.length === 0 ? 
        <div>
          <p>No Missiles</p>
        </div> :
        
          displayMissiles.map((missile) => (
            <li className="h-10 w-fit flex my-5" key={missile.missile.name}>
              <Link className="cursor-pointer hover:bg-blue-600  bg-blue-500 rounded-lg h-full block p-2 shadow-md" to={"/dashboard/missile/" + missile.missile.id}>{missile.missile.name}</Link> - <EditableField
                  label="Quantity"
                  value={missile.quantity}
                  onEdit={(newValue: any) => {
                      missile.quantity = newValue;
                      setDisplayMissiles([...displayMissiles]);
                      base.missiles.forEach((missileStor) => {
                          if (missileStor.missile.id === missile.missile.id) {
                              missileStor.quantity = newValue;
                          }
                      });
                      props.onEdit(base.missiles);
                  }}
                  onCancel={() => console.log("Cancel missile quantity")}
              />
            </li>
          ))
        }
      </ul>
      {!showMissileForm ?
      <button
        onClick={() => {
          setShowMissileForm(true);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >Add Missile
      </button> :
      <>
      <MissileBox baseId={base.id} />
      <button
        onClick={() => {
          setShowMissileForm(false);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Cancel
      </button>
      </>

    }
    </div>
  );
}

export default BaseMissiles;