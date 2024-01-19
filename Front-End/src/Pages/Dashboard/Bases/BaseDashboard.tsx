import { useEffect, useState } from "react"
import { getDoc } from "firebase/firestore"

import { firestore } from "../../../firebase"
import { Missile, Base } from "../../../types"

import BaseCard from "./BaseCard"
import NewBaseForm from "./NewBaseForm"
import { Button } from "../../../Components/Button"

export interface Missiles {
  [key: string]: Missile[]
}

function BaseDashboard() {

  const basesRef = firestore.collection('bases')

  const [bases, setBases] = useState<Base[]>([])
  const [missiles, setMissiles] = useState<Missiles>({});

  const [basesChanged, setBasesChanged] = useState(false);

  const [showNewBaseForm, setShowNewBaseForm] = useState(false);

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
  }, [basesChanged]);

  return (
      <div className="mt-5">
        <h2 className="text-center">Bases</h2>
        <div className="flex justify-center flex-wrap">
          {bases.map((base) => {
            return (
              <BaseCard onDelete={() => setBasesChanged(!basesChanged)} key={base.id} base={base} missiles={missiles} />
            )
          })}
        </div>
        {showNewBaseForm && <NewBaseForm onUpload={() => setBasesChanged(!basesChanged)} />}
        <div className="mt-5 flex items-center justify-center">
          { showNewBaseForm ?  
            <Button onClick={() => setShowNewBaseForm(false)}>Cancel</Button>:
            <Button onClick={() => setShowNewBaseForm(true)}>New Base</Button>
          }
        </div> 
      </div>
  )
}

export default BaseDashboard