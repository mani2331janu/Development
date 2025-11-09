import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { CiFilter } from "react-icons/ci";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useTheme } from "../../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const EmployeeList = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const { theme } = useTheme();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  createTheme("darkCustom", {
    text: { primary: "#f9fafb", secondary: "#d1d5db" },
    background: { default: "#1f2937" },
    context: { background: "#374151", text: "#FFFFFF" },
    divider: { default: "#374151" },
    highlightOnHover: { default: "#374151", text: "#f9fafb" },
  });

  const handleFilter = () => setShowFilter((pre) => !pre);
  const getAllEmployee = async () => {
    try {
      const res = await api.get(`${api_url}api/administration/employee/list`);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { name: "#", cell: (row, index) => index + 1 },
    {
      name: "Employee ID",
      selector: (row) => row.employee_id || "-",
      sortable: true,
    },

    {
      name: "Employee Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
    },

    {
      name: "Mobile No",
      selector: (row) => row.mobile_no || "-",
    },

    {
      name: "Status",
      cell: (row) => (
        <button
          className={`px-3 py-1 rounded ${
            row.status === 1 ? "bg-green-600" : "bg-red-600"
          } text-white hover:opacity-80 transition cursor-pointer`}
          onClick={() => handleStatus(row._id, row.status)}
        >
          {row.status === 1 ? "Active" : "Inactive"}
        </button>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            title="Edit"
            className="text-green-600 p-1 text-xl hover:text-black dark:text-white cursor-pointer"
            onClick={() => navigate(`/administration/employee/edit/${row._id}`)}
          >
            <TbEdit />
          </button>

          <button
            title="View"
            className="text-blue-600 p-1 text-xl hover:text-black dark:text-white cursor-pointer"
            onClick={() => navigate(`/administration/employee/view/${row._id}`)}
          >
            <AiOutlineEye />
          </button>

          <button
            title="Delete"
            className="text-red-600 p-1 text-xl hover:text-black dark:text-white cursor-pointer"
            onClick={() => handleDelete(row._id)}
          >
            <MdDeleteForever />
          </button>
        </>
      ),
    },
    {
      name: "Created By",
      selector: (row) => row.created_by?.name,
    },

    {
      name: "Created At",
      selector: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString("en-GB")
          : "-",
    },
  ];

  useEffect(() => {
    getAllEmployee();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold dark:text-white">Employee List</h2>
        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <CiFilter /> Filter
          </button>
          <button
            onClick={() => navigate("/administration/employee/add")}
            className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <IoIosAddCircle /> Add
          </button>
        </div>
      </div>

      {showFilter && (
        <form className="transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-md duration-300 shadow-md border border-gray-200 rounded-xl p-5 mb-6">
          <div className="flex flex-wrap"></div>

          <div className="flex justify-end mt-5 gap-3">
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Apply Filter
            </button>
            <button
              type="button"
              className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
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
          <button className="flex cursor-pointer items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            <FaFileExcel /> Excel
          </button>
          <button className="flex cursor-pointer items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md border border-gray-200 rounded-xl">
        <DataTable
          columns={columns}
          data={employee}
          pagination
          highlightOnHover
          responsive
          theme={theme === "dark" ? "darkCustom" : "default"}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
