import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";

const LocationList = () => {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const [locations, setLocations] = useState([]);   // ✅ start as empty array

  const getAllList = async () => {
    try {
      const res = await api.get(`${api_url}api/master/location/list`);
      setLocations(res.data);  
    } catch (err) {
      console.error("Failed to fetch locations:", err);
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  const handleAdd = () => {
    navigate("/master/location/add");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Location List</h3>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="border border-gray-300 rounded min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {locations.map((loc, index) => (
              <tr key={loc._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{loc.location_name}</td>
                <td className="px-4 py-2 border text-center">
                  <button onClick={()=>{navigate(`/master/location/edit/${loc._id}`)}} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {locations.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-3 text-gray-500">
                  No locations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationList;
