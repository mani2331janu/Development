import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { CiFilter } from "react-icons/ci";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import api from "../../../../utils/api";
import { AiOutlineEye } from "react-icons/ai";

const MedicalList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showFilter, setShowFilter] = useState(false);
  const [medical, setMedical] = useState([]);
  const api_url = import.meta.env.VITE_API_URL;

  // Fetch medical data
  const medicalList = async () => {
    try {
      const res = await api.get(`${api_url}api/master/medical/list`);
      setMedical(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    medicalList();
  }, []);

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  createTheme("darkCustom", {
    text: {
      primary: "#f9fafb",
      secondary: "#d1d5db",
    },
    background: {
      default: "#1f2937",
    },
    context: {
      background: "#374151",
      text: "#FFFFFF",
    },
    divider: {
      default: "#374151",
    },
    highlightOnHover: {
      default: "#374151",
      text: "#f9fafb",
    },
  });



  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Location Name",
      selector: (row) => row.location_id?.location_name || "-",
    },
    {
      name: "Medical Name",
      selector: (row) => row.medical_name || "-",
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`px-3 py-1 rounded ${row.status === 1 ? "bg-green-600 text-white" : "bg-red-600 text-white"
            } hover:opacity-80 transition`}
          onClick={() => toggleStatus(row._id, row.status)}
        >
          {row.status === 1 ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => {
            navigate(`/master/medical/view/${row._id}`);
          }}
          title="View Details"
          className="text-blue-600 p-1 text-xl hover:text-black hover:scale-125 transition-transform duration-200 dark:text-white"
        >
          <AiOutlineEye />
        </button>
      ),
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold dark:text-white">Medical List</h2>
        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-transform duration-400 hover:scale-110"
          >
            <CiFilter /> Filter
          </button>
          <button
            onClick={() => navigate("/master/medical/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-transform duration-400 hover:scale-110"
          >
            <IoIosAddCircle /> Add
          </button>
        </div>
      </div>

      {/* Filter Form */}
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

      {/* Export Buttons */}
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

      {/* DataTable */}
      <div className="overflow-x-auto bg-white shadow-md border border-gray-200 rounded-xl">
        <DataTable
          columns={columns}
          data={medical}
          pagination
          highlightOnHover
          responsive
          theme={theme === "dark" ? "darkCustom" : "default"}

        />
      </div>
    </div>
  );
};

export default MedicalList;
