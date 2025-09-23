import React from "react";
import { BsDatabaseFill } from "react-icons/bs";
const EmptyState = ({
  onCreate,
}: {
  onCreate: () => void;
}) => (
  <div className="flex items-center justify-center w-full h-[410px] mt-[2cm]">
    <div className="rounded-[16px] px-16 py-24 flex flex-col items-center w-full shadow-xl max-w-4xl bg-white">
      <p className="text-2xl mb-8 text-center text-[#214A5A]">
        Log your energy consumption<br />
        and tea production to view your records here.
      </p>
      <button
        className="bg-[#F79B72] text-[#F3F3F3] font-bold py-4 px-16 rounded-lg text-2xl mt-6 hover:bg-[#C76C4C] transition-colors cursor-pointer"
        onClick={onCreate}
      >
        + Create
      </button>
    </div>
  </div>
);
export default EmptyState;
