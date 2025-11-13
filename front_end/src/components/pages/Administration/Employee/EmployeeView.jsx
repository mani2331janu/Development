import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';

const EmployeeView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api_url = import.meta.env.VITE_API_URL;
  const [employee, setEmployee] = useState({});

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`${api_url}api/administration/employee/view/${id}`)
      setEmployee(res.data)

    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => { fetchEmployee() })

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black dark:text-white">Employee Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 text-white py-1 bg-blue-500 rounded transition-transform duration-400 hover:scale-110 hover:bg-blue-700"
        >
          Back
        </button>
      </div>
      <hr className="my-4 border border-gray-400 dark:border-white" />


      <div className="grid grid-cols-3 gap-y-4 gap-x-8 text-sm">
        <div>
          <label className="block text-black-900 dark:text-white font-bold text-l mb-2">Employee ID</label>
          <p className="text-gray-800 dark:text-white"> {employee.employee_id}</p>
        </div>

        <div>
          <label className="block text-black-900 dark:text-white font-bold text-l mb-2">Employee Name</label>
          <p className="text-gray-800 dark:text-white"> {`${employee.first_name} ${employee.last_name}`}</p>
        </div>

        <div>
          <label className="block text-black-900 dark:text-white font-bold text-l mb-2">Medical Name</label>
          <p className="text-gray-800 dark:text-white"></p>
        </div>

        <div>
          <label className="block text-black-900 dark:text-white font-bold text-l mb-2">Created By</label>
          <p className="text-gray-800 dark:text-white"></p>
        </div>

        <div>
          <label className="block text-black-900 dark:text-white font-bold text-l mb-2">Created At</label>
          <p className="text-gray-800 dark:text-white"></p>
        </div>


      </div>

      <hr className="my-4 border border-gray-400 dark:border-white" />


    </div>
  )
}

export default EmployeeView
