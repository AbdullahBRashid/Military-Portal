import { firestore } from "../../../firebase"
import { useEffect, useState } from "react"
import { Base, Missile } from "../../../types";
import { DocumentReference, getDoc, updateDoc } from "firebase/firestore";

function MissileBox(props: {baseId: string}) {
    const missilesRef = firestore.collection('missiles');
    const [missiles, setMissiles] = useState<Missile[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchMissiles = async () => {
            const docs = await missilesRef.get();
            const newMissiles: Missile[] = [];
            docs.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;
                newMissiles.push(data as Missile);
            });
            setMissiles(newMissiles);
            setLoading(false);
        }

        fetchMissiles();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let missileId = e.target.missile.value;
        let quantity = e.target.quantity.value;

        let baseDocRef = firestore.collection('bases').doc(props.baseId);
        let missileDocRef = firestore.collection("missiles").doc(missileId) as unknown as DocumentReference<Missile>;
        
        let doc = await getDoc(baseDocRef);
        let data = doc.data() as Base;

        let index = data.missiles.findIndex((store) => {
            return store.missile.id == missileId;
        })

        if (index == -1) {
            data.missiles.push({
                missile: missileDocRef,
                quantity: parseInt(quantity)
            });
        } else {
            data.missiles[index].quantity += parseInt(quantity);
        }

        updateDoc(baseDocRef, data);
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

  return (
    <div >
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 m-auto">
        <select required name="missile" id="missile" defaultValue={""}>
            <option value="" disabled>Select Missile</option>
            {missiles.map(missile => (
                <option key={missile.id} value={missile.id}>{missile.name}</option>
            ))}
        </select>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" name="quantity" defaultValue={0} id="quantity" required min="1" />

        <input type="submit" value="Enter" />
      </form>
    </div>
  )
}

export default MissileBox