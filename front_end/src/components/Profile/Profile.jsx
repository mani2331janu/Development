import React, { useState } from "react";
import {
  FiEdit,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiHash
} from "react-icons/fi";
import api from "../../utils/api";


const Profile = () => {
  const api_url = import.meta.env.VITE_API_URL;
  
  
  const [profile,setProfile] = useState();
  const fetchData = async() => {
    try {
        const data = await api.get(`${api_url}api/administration/get-profile-data`)
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      
      <div className="flex items-center gap-10">

        <div className="relative min-w-[160px]">
          <img
            src="/default-user.png"
            alt="Profile"
            className="w-40 h-40 rounded-full border-2 border-blue-500 object-cover"
          />

          <button className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow border border-gray-300">
            <FiEdit className="text-blue-600 w-5 h-5" />
          </button>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">
            Manikandan M
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">

            <div className="flex items-center gap-3">
              <FiHash className="text-blue-500 w-5 h-5" />
              <p><strong>Employee Id:</strong> 1319</p>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="text-blue-500 w-5 h-5" />
              <p><strong>Date of Birth:</strong> 31-05-2001</p>
            </div>

            <div className="flex items-center gap-3">
              <FiMapPin className="text-blue-500 w-5 h-5" />
              <p>
                <strong>Present Address:</strong> 270 Bagavathi Nagar, Gobi...
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-blue-500 w-5 h-5" />
              <p><strong>Email:</strong> manikandan.m@ardhas.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-blue-500 w-5 h-5" />
              <p><strong>Mobile Number:</strong> 7825095812</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
