import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, updateDoc } from "firebase/firestore";

import EditableField from "../../../Components/EditableField";
import { firestore } from "../../../firebase";
import { Missile } from "../../../types";

const MissilePage = () => {
  const { id } = useParams();
  const missileRef = firestore.collection('missiles').doc(id);

  const [missile, setMissile] = useState<Missile>({
    id: "",
    name: "",
    blastRadius: 0,
    launchCost: 0,
    productionCost: 0,
    range: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const doc = await getDoc(missileRef);
      if (doc.exists()) {
        doc.data().id = doc.id;
        setMissile(doc.data() as Missile);
      } else {

      }
    }

    fetchData();
  }, [])

  const handleEditField = (field: string, newValue: string) => {
    setMissile({ ...missile, [field]: newValue });
  };

  const handleCancelEdit = () => {
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MissilePage</h1>
      <EditableField
        label="Name"
        value={missile.name}
        onEdit={(newValue: any) => handleEditField("name", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Blast Radius"
        value={missile.blastRadius}
        onEdit={(newValue: any) => handleEditField("blastRadius", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Launch Cost"
        value={missile.launchCost}
        onEdit={(newValue: any) => handleEditField("launchCost", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Production Cost"
        value={missile.productionCost}
        onEdit={(newValue: any) => handleEditField("productionCost", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Range"
        value={missile.range}
        onEdit={(newValue: any) => handleEditField("range", newValue)}
        onCancel={handleCancelEdit}
      />
      <button
        onClick={() => {
          updateDoc(missileRef, missile);
          console.log("Overall update");
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Update
      </button>
    </div>
  );
};

export default MissilePage;