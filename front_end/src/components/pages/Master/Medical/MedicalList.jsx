import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiFilter } from "react-icons/ci";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MedicalList = () => {
const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);


  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold dark:text-white">Medical List</h2>

        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 transition-transform duration-400 hover:scale-110 rounded hover:bg-blue-700"
          >
            <CiFilter /> Filter
          </button>
          <button
            onClick={()=>{navigate("/master/medical/add")}}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 transition-transform duration-400 hover:scale-110 rounded hover:bg-blue-700"
          >
            <IoIosAddCircle /> Add
          </button>
        </div>
        
      </div>

      {showFilter && (
        <form className="transition-all duration-300 bg-white shadow-md border border-gray-200 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>

          <div className="flex justify-end mt-5 gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Apply Filter
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      )}

      <hr className="my-4 border-gray-400 dark:border-white-700" />

      <div className="flex justify-between items-center mt-5 mb-5">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            <FaFileExcel /> Excel
          </button>

          <button className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md border border-gray-200 rounded-xl">
        <DataTable pagination highlightOnHover responsive />
      </div>
    </div>
  );
};

export default MedicalList;
