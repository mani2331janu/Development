import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../../../utils/api";
import { Controller, useForm } from "react-hook-form";

const MedicalAdd = () => {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const [locations, setLocations] = useState([]);
  const { register,control, handleSubmit } = useForm();

  const fetchLocationName = async () => {
    try {
      const res = await api.get(`${api_url}api/master/location/getLocation`);
      const options = res.data.map((m) => ({
        value: m._id,
        label: m.location_name, // ✅ fix typo
      }));
      setLocations(options);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLocationName();
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black-500 dark:text-white">
          <span>Medical / </span>
          <span>Add</span>
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white text-l font-bold rounded px-3 py-1 transition-transform duration-400 hover:scale-110 hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <hr className="mt-4 border-gray-400 dark:border-gray-600" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          {/* Select Location */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label
              htmlFor=""
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Select Location
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locations}
                  placeholder="Select Location..."
                />
              )}
            />
          </div>

          {/* Medical Name */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label
              className="block text-gray-700 dark:text-white font-medium mb-2"
              htmlFor=""
            >
              Medical Name
            </label>
            <input
              type="text"
              {...control.register}
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter Medical Name"
            />
          </div>
        </div>
        <hr className="mt-4 border-gray-400 dark:border-gray-600" />

        <div className="mt-4 flex justify-end px-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalAdd;
