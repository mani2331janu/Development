import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../../../utils/api";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const MedicalAdd = () => {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const [locations, setLocations] = useState([]);

  // ✅ Yup validation schema
  const schema = Yup.object().shape({
    location: Yup.object().required("Location is required"), // Select returns an object
    medical_name: Yup.string().required("Medical Name is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchLocationName = async () => {
    try {
      const res = await api.get(`${api_url}api/master/location/getLocation`);
      const options = res.data.map((m) => ({
        value: m._id,
        label: m.location_name,
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
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
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
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Select Location
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locations}
                  placeholder="Select Location..."
                  className="text-gray-900 dark:text-gray-200"
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "42px", // match input height
                      borderColor: field.value ? "#3b82f6" : "#9ca3af",
                      backgroundColor: "#ffffff",
                    }),
                  }}
                />
              )}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Medical Name */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Medical Name
            </label>
            <input
              type="text"
              {...register("medical_name")}
              className="border border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-gray-200
                rounded w-full p-2 
                focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter Medical Name"
            />
            {errors.medical_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.medical_name.message}
              </p>
            )}
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
