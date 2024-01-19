import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { Missile, Base } from "../../../types"
import { getDoc } from "firebase/firestore"
import BaseCard from "./BaseCard"

export interface Missiles {
  [key: string]: Missile[]
}

function BaseDashboard() {

  const basesRef = firestore.collection('bases')

  const [bases, setBases] = useState<Base[]>([])
  const [missiles, setMissiles] = useState<Missiles>({});

  useEffect(() => {
    const unsubscribe = async () => {
      let snapshot = await basesRef.get();
      const bases: Base[] = [];
      const newMissiles: Missiles = {};
  
      snapshot.forEach(async (doc) => {
        const baseData = doc.data() as Base;
        baseData.id = doc.id;
        bases.push(baseData);
  
        for (const missileStorage of baseData.missiles) {
          let missileDoc = await getDoc(missileStorage.missile);
          const missileData = missileDoc.data() as Missile;
  
          if (newMissiles[baseData.name]) {
            newMissiles[baseData.name].push(missileData);
          } else {
            newMissiles[baseData.name] = [missileData];
          }
        }
  
        setMissiles((prevMissiles) => ({ ...prevMissiles, ...newMissiles }));
      });
  
      setBases(bases);
    };
  
    unsubscribe();
  }, []);

  return (
      <div className="mt-5">
        <h2 className="text-center">Bases</h2>
        <div>
          {bases.map((base) => {
            return (
              <BaseCard key={base.id} base={base} missiles={missiles} />
            )
          })}
        </div>
      </div>
  )
}

export default BaseDashboard