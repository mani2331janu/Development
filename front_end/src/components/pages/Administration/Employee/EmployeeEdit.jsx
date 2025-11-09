import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../../../utils/api";
import Select from "react-select";

const EmployeeEdit = () => {
  const { id } = useParams();
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const genderOption = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
    { value: 3, label: "Others" },
  ];

  // ✅ Validation Schema
  const schema = Yup.object().shape({
    employee_id: Yup.string().required("Employee ID is required"),
    first_name: Yup.string().required("First Name is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Fetch Employee Data
  const fetchEmployeeData = async () => {
    try {
      const res = await api.get(
        `${api_url}api/administration/employee/edit/${id}`
      );
      const employee = res.data;
      const selectedGender = genderOption.find(
        (opt) => opt.value === Number(employee.gender)
      );
      reset({ ...employee, gender: selectedGender });
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.put(
        `${api_url}api/administration/employee/update/${id}`,
        data
      );
      console.log("Updated:", res.data);
      navigate("/employee");
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          <span>Employee / </span>
          <span>Edit</span>
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white font-bold rounded px-3 py-1 hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <hr className="mt-4 border-gray-400 dark:border-gray-600" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          {/* Employee ID */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Employee ID
            </label>
            <input
              type="text"
              {...register("employee_id")}
              className="border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
            {errors.employee_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employee_id.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name")}
              placeholder="Enter First Name..."
              className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* last name */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="required block text-gray-700 dark:text-white font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name")}
              placeholder="Enter Last Name..."
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="required block text-gray-700 dark:text-white font-medium mb-2">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={genderOption}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected)}
                  placeholder="Select Gender"
                />
              )}
            />
            {errors.gender && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <hr className="mt-4 border-gray-400 dark:border-gray-600" />

        <div className="mt-4 flex justify-end px-2 gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 font-semibold transition-colors"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
