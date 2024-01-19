import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { Missile } from "../../../types"
import { firestore, } from "../../../firebase";



function NewMissileForm(props: { onUpload: () => void }) {
    const [missile, setMissile] = useState<Missile>({
        id: "",
        name: "",
        blastRadius: 0,
        launchCost: 0,
        productionCost: 0,
        range: 0
    });

    const missileRef = collection(firestore, 'missiles');

    const [name, setName] = useState<string>("");
    const [blastRadius, setBlastRadius] = useState<number>(0);
    const [launchCost, setLaunchCost] = useState<number>(0);
    const [productionCost, setProductionCost] = useState<number>(0);
    const [range, setRange] = useState<number>(0);

    const uploadMissile = async () => {
        try {
            await addDoc(missileRef, {
                name: missile.name,
                blastRadius: missile.blastRadius,
                launchCost: missile.launchCost,
                productionCost: missile.productionCost,
                range: missile.range
            })
            props.onUpload();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
      if (missile.name !== "" && missile.blastRadius !== 0 && missile.launchCost !== 0 && missile.productionCost !== 0 && missile.range !== 0) {
        uploadMissile();
      } else {
        console.log("Not all fields are filled out");
      }
    }, [missile]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const newMissile: Missile = {
            id: "",
            name: name,
            blastRadius: blastRadius,
            launchCost: launchCost,
            productionCost: productionCost,
            range: range
        };

    
        setMissile(newMissile);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
          <div className="text-center font-bold text-xl mb-4">New Missile</div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4" method="POST">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="blastRadius" className="text-sm font-semibold">
                Blast Radius
              </label>
              <input
                type="number"
                name="blastRadius"
                id="blastRadius"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setBlastRadius(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="launchCost" className="text-sm font-semibold">
                Launch Cost
              </label>
              <input
                type="number"
                name="launchCost"
                id="launchCost"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setLaunchCost(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="productionCost" className="text-sm font-semibold">
                Production Cost
              </label>
              <input
                type="number"
                name="productionCost"
                id="productionCost"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setProductionCost(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="range" className="text-sm font-semibold">
                Range
              </label>
              <input
                type="number"
                name="range"
                id="range"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setRange(parseInt(e.target.value))}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      );
}

export default NewMissileForm