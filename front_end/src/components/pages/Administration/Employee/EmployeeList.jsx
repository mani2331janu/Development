import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { CiFilter } from 'react-icons/ci';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const {theme} = useTheme();
    const navigate = useNavigate();
    const [showFilter,setShowFilter] = useState(false);

    const handleFilter = () => setShowFilter((pre)=>!pre)
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
                <form className="transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-md duration-300 shadow-md border border-gray-200 rounded-xl p-5 mb-6"
                >
                    <div className="flex flex-wrap">
                      
                    </div>

                    <div className="flex justify-end mt-5 gap-3">
                        <button type="submit" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
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
                    <button

                        className="flex cursor-pointer items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        <FaFileExcel /> Excel
                    </button>
                    <button
                        className="flex cursor-pointer items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        <FaFilePdf /> PDF
                    </button>
                </div>
            </div>


            <div className="overflow-x-auto bg-white shadow-md border border-gray-200 rounded-xl">
                <DataTable
                    
                    pagination
                    highlightOnHover
                    responsive
                    theme={theme === "dark" ? "darkCustom" : "default"}
                />
            </div>
        </div>
    )
}

export default EmployeeList
