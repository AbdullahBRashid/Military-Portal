import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Base, Missile, MissileStorage } from "../../../types";

import EditableField from "../../../Components/EditableField";

function BaseMissiles(props: { base: Base, onEdit: (missiles: MissileStorage[]) => void, onCancel: any }) {
  const [displayMissiles, setDisplayMissiles] = useState<
    { missile: Missile; quantity: number }[]
  >([]);

    let base = props.base;

  useEffect(() => {
    base = props.base;
  }, [props.base]);

  useEffect(() => {
    const fetchMissiles = async () => {
      const newDisplayMissiles: { missile: Missile; quantity: number }[] = [];

      for (const missileStor of base.missiles) {
        const doc = await getDoc(missileStor.missile);
        console.log(doc.data());

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
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Missiles</h2>
      <ul className="list-none list-inside">
        {displayMissiles.map((missile) => (
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
        ))}
      </ul>
    </div>
  );
}

export default BaseMissiles;