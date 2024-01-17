// EditableField.tsx
import React, { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string | number;
  onEdit: (value: string) => void;
  onCancel: () => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onEdit, onCancel }) => {
  const [editable, setEditable] = useState(false);
  const [fieldValue, setFieldValue] = useState(value.toString());

  const handleEdit = () => {
    setFieldValue(value.toString());
    setEditable(true);
  };

  const handleCancel = () => {
    setEditable(false);
    onCancel();
  };

  const handleUpdate = () => {
    setEditable(false);
    onEdit(fieldValue);
  };

  return (
    <div className="my-2">
      <label className="font-bold">{label}: </label>
      {editable ? (
        <>
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
          <button
            onClick={handleCancel}
            className="px-2 py-1 bg-red-500 text-white rounded ml-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-2 py-1 bg-gray-600 text-white rounded ml-2"
          >
            Confirm
          </button>
        </>
      ) : (
        <>
          <span className="px-2 py-1">{value}</span>
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EditableField;