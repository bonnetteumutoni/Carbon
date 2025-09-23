"use client";
import React, { useState, useEffect } from "react";
import FactoryLayout from "../components/FactoryLayout";
import ModalForm from "./components/Modal";
import RecordsTable from "../components/RecordsTable";
import useFetchRecords from "../hooks/useFetchRecords";
import { saveRecord,updateRecord } from "../utils/fetchRecords";
import Button from "../sharedComponents/Button";
import { FiPlus } from "react-icons/fi";
// import SuccessToast from "../components/SuccessToast";
import EmptyState from "../components/EmptyState";

export default function RecordsPage() {
 const { records: allRecords, loading, error } = useFetchRecords();
 const [records, setRecords] = useState(allRecords);
 const [page, setPage] = useState(1);
 const pageSize = 8;


 const [modalOpen, setModalOpen] = useState(false);
 const [editRecord, setEditRecord] = useState<any | null>(null);
 const [showToast, setShowToast] = useState(false);
 const [toastMessage, setToastMessage] = useState("");
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 const [searchTerm, setSearchTerm] = useState("");
 const userFactoryId = 10;


 useEffect(() => {
   setRecords(allRecords);
 }, [allRecords]);


 const filteredRecords = records.filter(record => {
   const matchesSearch = Object.values(record).some(value =>
     String(value).toLowerCase().includes(searchTerm.toLowerCase())
   );


   const matchesDate = selectedDate
     ? (() => {
         const selected = new Date(selectedDate).toDateString();
         return (
           new Date(record.created_at).toDateString() === selected ||
           (record.updated_at && new Date(record.updated_at).toDateString() === selected)
         );
       })()
     : true;


   return matchesSearch && matchesDate;
 });


 const totalPages = Math.ceil(filteredRecords.length / pageSize);
 const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);


 const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
   if (e.key === "Enter") setPage(1);
 };


 const handleEdit = (record: any) => {
   setEditRecord(record);
   setModalOpen(true);
 };


 const handleAdd = () => {
   setEditRecord(null);
   setModalOpen(true);
 };


 const handleSave = async (data: any) => {
   try {
     if (editRecord && editRecord.data_id) {
       const updated = await updateRecord(editRecord.data_id, data);
       setRecords(prevRecords =>
         prevRecords.map(record => (record.data_id === updated.data_id ? updated : record))
       );
       setToastMessage("Record updated successfully!");
     } else {
       const newRecord = await saveRecord(data);
       setRecords(prevRecords => [newRecord, ...prevRecords]);
       setToastMessage("Record saved successfully!");
     }
     setModalOpen(false);
     setShowToast(true);
     setTimeout(() => setShowToast(false), 3000);
     setPage(1);
   } catch (error) {
     alert("Failed to save record. Check console for details.");
   }
 };


 return (
   <FactoryLayout>
    <div className="flex min-h-screen overflow-hidden bg-[#183040] text-[#fcfcfc]">
     
     <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
       {/* <PageHeader /> */}


       <div className="mb-6 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
         <h2 className="text-xl md:text-3xl font-bold">Records</h2>
         <p className="text-lg text-white mt-1">Data on energy consumption and production.</p>
       </div>


       <div className="flex flex-row gap-8 mb-8 items-center px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
         {/* <SearchBar value={searchTerm} onChange={setSearchTerm} onKeyDown={handleSearchKeyDown} placeholder="Search records..." /> */}
         <div className="ml-auto">
           <Button buttonText="Create" variant="create" icon={<FiPlus />} onclickHandler={handleAdd} />
         </div>
       </div>


       <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 flex-1 min-h-0">
         {loading ? (
           <div className="flex justify-center items-center h-full">
             <span>Loading...</span>
           </div>
         ) : error ? (
           <div className="flex justify-center items-center h-full">
             <span className="text-red-400">{error}</span>
           </div>
         ) : records.length === 0 ? (
           <EmptyState onCreate={handleAdd} />
         ) : paginatedRecords.length === 0 ? (
           <div className="flex justify-center items-center h-full">
             <span>No records found.</span>
           </div>
         ) : (
           <RecordsTable records={paginatedRecords} onEdit={handleEdit} />
         )}
       </div>


       {filteredRecords.length > 0 && (
         <div className="mt-6 mb-6 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
           {/* <Pagination page={currentPage} totalPages={totalPages} isDark onPageChange={page => {
                        if (page >= 1 && page <= totalPages) setCurrentPage(page);
                    }} /> */}
         </div>
       )}
     </main>


     <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} editRecord={editRecord} onSave={handleSave} userFactoryId={userFactoryId} />


     {/* {showToast && <SuccessToast message={toastMessage} onClose={() => setShowToast(false)} />} */}
   </div>
   </FactoryLayout>
 );
}


