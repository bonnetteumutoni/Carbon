"use client";
import React, { useState, useEffect } from "react";
const energyTypes = [
  { id: "electricity", label: "Electricity (kWh)" },
  { id: "diesel", label: "Diesel (liters)" },
  { id: "firewood", label: "Firewood (kg)" },
];
interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { energy_type: string; energy_amount: string; tea_processed_amount: string; factory: number }) => void;
  editRecord?: any;
  userFactoryId: number;
}
const cleanEnergyAmount = (val: string | undefined): string => {
  return val ? val.replace(/[^0-9.]/g, "") : "";
};
const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSave, editRecord, userFactoryId }) => {
  const [energyType, setEnergyType] = useState(editRecord?.energy_type ?? energyTypes[0].id);
  const [energyAmount, setEnergyAmount] = useState(cleanEnergyAmount(editRecord?.energy_amount));
  const [teaProcessedAmount, setTeaProcessedAmount] = useState(editRecord?.tea_processed_amount);
  useEffect(() => {
    if (editRecord) {
      setEnergyType(editRecord.energy_type ?? energyTypes[0].id);
      setEnergyAmount(cleanEnergyAmount(editRecord.energy_amount));
      setTeaProcessedAmount(editRecord.tea_processed_amount ?? "");
    } else {
      setEnergyType(energyTypes[0].id);
      setEnergyAmount("");
      setTeaProcessedAmount("");
    }
  }, [editRecord]);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFactoryId) {
      alert("Unable to save record: Factory ID is missing. Contact KTDA.");
      return;
    }
    onSave({
      energy_type: energyType,
      energy_amount: energyAmount,
      tea_processed_amount: teaProcessedAmount,
      factory: userFactoryId,
    });
    setEnergyType(energyTypes[0].id);
    setEnergyAmount("");
    setTeaProcessedAmount("");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#183040] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-[#FFFFFF] mb-6">
          {editRecord ? "Edit Record" : "Add Record"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#FFFFFF]">Energy Type</label>
            <select
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              className="mt-2 p-3 w-full border rounded bg-[#F3F3F3] text-[#214A5A] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] appearance-none"
              required
            >
              {energyTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#FFFFFF]">Energy Amount</label>
            <input
              type="number"
              value={energyAmount}
              onChange={(e) => setEnergyAmount(e.target.value)}
              className="mt-2 p-3 w-full border rounded bg-[#F3F3F3] text-[#214A5A] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]"
              placeholder="e.g., 500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#FFFFFF]">Tea Processed Amount</label>
            <input
              type="number"
              value={teaProcessedAmount}
              onChange={(e) => setTeaProcessedAmount(e.target.value)}
              className="mt-2 p-3 w-full border rounded bg-[#F3F3F3] text-[#214A5A] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]"
              placeholder="e.g., 200"
              required
            />
          </div>
          <div className="flex justify-start gap-4">
             <button
              type="submit"
              className="px-4 py-2 bg-[#F79B72] text-[#FFFFFF] rounded hover:bg-[#C76C4C]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-[#FFFFFF] hover:text-[#F79B72]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalForm;
