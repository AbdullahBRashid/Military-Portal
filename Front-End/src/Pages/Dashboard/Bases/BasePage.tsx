// MissilePage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GeoPoint, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../firebase";
import { Base } from "../../../types";

import EditableField from "../../../Components/EditableField";
import BaseMissiles from "./BaseMissiles";
import { BaseProvider } from "./baseContext";

const BasePage = () => {
  const { id } = useParams();
  const baseRef = firestore.collection('bases').doc(id);

  const [base, setBase] = useState<Base>({
    id: "",
    name: "",
    location: new GeoPoint(0, 0),
    missiles: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const doc = await getDoc(baseRef);
      if (doc.exists()) {
        let data = doc.data();
        data.id = doc.id;
        setBase(data as Base);
      } else {

      }
    }

    fetchData();
  }, [])

  const handleEditField = (field: string, newValue: string) => {
    if (field === "longitude") {
      setBase({ ...base, location: new GeoPoint(base.location.latitude, parseFloat(newValue)) });
    } else if (field === "latitude") {
      setBase({ ...base, location: new GeoPoint(parseFloat(newValue), base.location.longitude) });
    }
    else setBase({ ...base, [field]: newValue });
  };

  const handleCancelEdit = () => {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BasePage</h1>
      <EditableField
        label="Name"
        value={base.name}
        onEdit={(newValue: any) => handleEditField("name", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Longitude"
        value={base.location.longitude}
        onEdit={(newValue: any) => handleEditField("longitude", newValue)}
        onCancel={handleCancelEdit}
      />
      <EditableField
        label="Latitude"
        value={base.location.latitude}
        onEdit={(newValue: any) => handleEditField("latitude", newValue)}
        onCancel={handleCancelEdit}
      />
      <BaseProvider base={base}>
        <BaseMissiles onEdit={(value) => {base.missiles = value; setBase(base)}} onCancel={() => {}}/>
      </BaseProvider>
      <button
        onClick={() => {
          updateDoc(baseRef, base);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Update
      </button>
      <button
        onClick={() => {
          deleteDoc(baseRef);
          navigate("/dashboard/base");
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default BasePage;