import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { Missile } from "../../../types"
import MissileCard from "./MissileCard"


function MissileDashboard() {

  const missilesRef = firestore.collection('missiles')

  const [missiles, setMissiles] = useState<Missile[]>([]);

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
  }, []);

  return (
      <div className="mt-5">
        <h2 className="text-center">Missiles</h2>
        <div className="flex items-center justify-center">
          {missiles.map((missile) => {
            return (
              <MissileCard key={missile.name} missile={missile} />
            )
          })}
        </div>
      </div>
  )
}

export default MissileDashboard