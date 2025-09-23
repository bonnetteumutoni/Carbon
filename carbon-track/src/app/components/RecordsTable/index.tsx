"use client";
import React from "react";
interface RecordType {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string;
  co2_equivalent: string;
  factory?: number;
}
interface RecordsTableProps {
  records: RecordType[];
  onEdit: (record: RecordType) => void;
}
const RecordsTable: React.FC<RecordsTableProps> = ({ records, onEdit }) => {
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });
  return (
    <div className="overflow-x-auto">
<table className="min-w-full bg-[#183040] border border-gray-700 border-collapse ">
  <thead>
    <tr className="bg-[#2A4759] text-white">
      <th className="p-3 border border-gray-700 w-1/8">Energy Type</th>
      <th className="p-3 border border-gray-700 w-1/8">Energy Amount</th>
      <th className="p-3 border border-gray-700 w-1/8">Tea Processed</th>
      <th className="p-3 border border-gray-700 w-1/8">Created At</th>
      <th className="p-3 border border-gray-700 w-1/8">CO2 Equivalent</th>
      <th className="p-3 border border-gray-700 w-1/8">Actions</th>
    </tr>
  </thead>
  <tbody>
    {records.map((record, index) => (
      <tr
        key={index}
        className={`border border-gray-700 ${
          index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
        }`}
      >
        <td className="p-3 font-semibold border border-gray-700 text-white">{record.energy_type}</td>
        <td className="p-3 border border-gray-700 text-white">{record.energy_amount}</td>
        <td className="p-3 border border-gray-700 text-white">{record.tea_processed_amount}</td>
        <td className="p-3 border border-gray-700 text-white">{new Date(record.created_at).toLocaleDateString()}</td>
        <td className="p-3 border border-gray-700 text-white">{record.co2_equivalent}</td>
        <td className="p-3 border border-gray-700 text-[#F79B72] cursor-pointer hover:underline" onClick={() => onEdit(record)}>Edit</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};
export default RecordsTable;
