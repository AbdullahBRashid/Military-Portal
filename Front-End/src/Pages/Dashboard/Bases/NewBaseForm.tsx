import { useEffect, useState } from "react";
import { Base, MissileStorage } from "../../../types"
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { firestore } from "../../../firebase";



function NewBaseForm(props: { onUpload: () => void }) {
    const [base, setBase] = useState<Base>({
        id: "",
        name: "",
        location: new GeoPoint(0, 0),
        missiles: [],
    });

    const baseRef = collection(firestore, 'bases');

    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<GeoPoint>(new GeoPoint(0, 0));

    const uploadMissile = async () => {
        try {
            console.log(baseRef);
            await addDoc(baseRef, {
                name: base.name,
                location: base.location,
                missiles: base.missiles,
            })
            props.onUpload();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
      if (base.name !== "") {
        uploadMissile();
      } else {
        console.log("Not all fields are filled out");
      }
    }, [base]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const newMissile: Base = {
            id: "",
            name: name,
            location: base.location,
            missiles: base.missiles,
        };

    
        setBase(newMissile);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
          <div className="text-center font-bold text-xl mb-4">New Base</div>
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
              <label htmlFor="longitude" className="text-sm font-semibold">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setLocation( new GeoPoint(base.location.latitude, parseInt(e.target.value)) )}
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
                onChange={(e) => setLocation( new GeoPoint(parseInt(e.target.value), base.location.longitude))}
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

export default NewBaseForm