import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { Missile } from "../../../types"
import MissileCard from "./MissileCard"
import NewMissileForm from "./NewMissileForm"

function MissileDashboard() {

  const missilesRef = firestore.collection('missiles')
  const [missiles, setMissiles] = useState<Missile[]>([]);
  const [missileAdded, setMissileAdded] = useState<boolean>(false);
  const [missileDeleted, setMissileDeleted] = useState<boolean>(false);

  const [showNewMissileForm, setShowNewMissileForm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = async () => {
      let snapshot = await missilesRef.get();
      const missiles: Missile[] = [];
  
      snapshot.forEach(async (doc) => {
        const missileData = doc.data() as Missile;
        missileData.id = doc.id;
        missiles.push(missileData);
      });

      setMissiles(missiles);
    };
  
    unsubscribe();
  }, [missileAdded, missileDeleted]);

  const onUpload = () => {
    setMissileAdded(!missileAdded);
  }

  const onDelete = () => {
    setMissileDeleted(!missileDeleted);
  }

  return (
      <div className="mt-5">
        <h2 className="text-center">Missiles</h2>
        <div className="flex items-center justify-center flex-wrap">
          {missiles.map((missile) => {
            return (
              <MissileCard onDelete={onDelete} key={missile.id} missile={missile} />
            )
          })}
        </div>
        {showNewMissileForm && <NewMissileForm onUpload={onUpload} />}
        <div className="flex items-center justify-center">
          <button onClick={() => setShowNewMissileForm(!showNewMissileForm)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {showNewMissileForm ? "Cancel" : "Add Missile"}
          </button>
        </div>
      </div>
  )
}

export default MissileDashboard