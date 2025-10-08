import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import api from '../../../../utils/api';
import { getUploadLogStatus } from '../../../../utils/helper';
import { AiOutlineEye } from "react-icons/ai";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { CiFilter } from "react-icons/ci";

const UploadLogList = () => {
  const [uploadLog, setUploadLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterLocation, setFilterLocation] = useState([])
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchUploadLog = async () => {
    try {
      const res = await api.get(`${api_url}api/administration/uploadlog/list`);
      setUploadLog(res.data || res);
    } catch (err) {
      console.error("Error fetching upload logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    fetchUploadLog();
  }, []);

  const exportToExcel = () => {
    const data = uploadLog.map((row, i) => ({
      "#": i + 1,
      "File Name": row.file_name,
      "Status":
        row.status == 1 ? "In Progress" :
          row.status == 2 ? "Failed" :
            row.status == 3 ? "Success" : "Error",
      "Created At": new Date(row.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upload Logs");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "upload_logs.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Upload Logs", 14, 15);

    const tableData = uploadLog.map((row, i) => [
      i + 1,
      row.file_name,
      row.status == 1 ? "In Progress" :
        row.status == 2 ? "Failed" :
          row.status == 3 ? "Success" : "Error",
      new Date(row.createdAt).toLocaleString(),
    ]);

    autoTable(doc, { // <-- use autoTable as a function, pass doc as first param
      head: [["#", "File Name", "Status", "Created At"]],
      body: tableData,
      startY: 25,
    });

    doc.save("upload_logs.pdf");
  };


  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "File Name",
      selector: (row) => row.file_name,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => getUploadLogStatus(row.status),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => { navigate(`/administration/upload-log/view/${row._id}`) }}
          className='text-blue-600 p-1 text-xl hover:text-black hover:scale-125 transition-transform duration-200'>
          <AiOutlineEye />
        </button>
      )
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Upload Logs</h2>

        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <CiFilter /> Filter
          </button>

        </div>
      </div>
      {showFilter && (
        <form
          // onSubmit={handleFilterSubmit}
          className="overflow-hidden transition-all duration-300 opacity-100 mt-4 mb-3 bg-gray-100 p-4 rounded border border-gray-300"
        >
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">

            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
          >
            Apply
          </button>
          <button
            // onClick={handleReset}
            type="submit"
            className="ml-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
          >
            Reset
          </button>
        </form>

      )}
      <hr className="my-4" />


      <div className="flex justify-between items-center mt-5 mb-5">
        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            <FaFileExcel /> Excel
          </button>

          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            <FaFilePdf /> PDF
          </button>
        </div>

        <div className="flex ">

        </div>
      </div>

      <DataTable
        columns={columns}
        data={uploadLog}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default UploadLogList;
