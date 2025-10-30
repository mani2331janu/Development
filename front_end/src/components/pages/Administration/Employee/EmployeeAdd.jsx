import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Select from "react-select";

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);
  const [preview, setPreview] = useState(null); // for showing uploaded image preview

  // ✅ Options
  const genderOption = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
    { value: 3, label: "Others" },
  ];

  const bloodGroupOption = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const defaultValues = {
    first_name: "",
    last_name: "",
    gender: null,
    blood_group: null,
    employee_id: "",
    mobile_no: "",
    profile_image: [],
  };

  const schema = Yup.object().shape({
    employee_id: Yup.string().required("Employee ID is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("last Name is required"),
    gender: Yup.object().required("Gender is required"),
    blood_group: Yup.object().required("Blood group is required"),
    mobile_no: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),
    profile_image: Yup.mixed()
      .required("Profile image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      }),
  });

  // ✅ useForm setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  // ✅ Handle file preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          <span>Employee / </span>
          <span>Add</span>
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white cursor-pointer font-bold rounded px-3 py-1 hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <hr className="mt-4 border-gray-400 dark:border-gray-600" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="w-full font-bold text-white mt-3 px-4 py-2 rounded-md bg-blue-700 dark:bg-gray-600 border border-blue-800 dark:border-gray-700 shadow-sm">
            Basic Information
          </div>

          {/* Employee ID */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Employee ID
            </label>
            <input
              type="text"
              {...register("employee_id")}
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.employee_id && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.employee_id.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name")}
              placeholder="Enter First Name..."
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
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
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={genderOption}
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

          {/* Blood Group */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Blood Group
            </label>
            <Controller
              name="blood_group"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={bloodGroupOption}
                  placeholder="Select Blood Group"
                />
              )}
            />
            {errors.blood_group && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.blood_group.message}
              </p>
            )}
          </div>

          {/* Mobile No */}
          {/* <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Mobile No
            </label>
            <input
              type="text"
              {...register("mobile_no")}
              placeholder="Enter Mobile No..."
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobile_no && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.mobile_no.message}
              </p>
            )}
          </div> */}

          {/* Profile Image */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profile_image")}
              onChange={(e) => {
                handleFileChange(e);
                register("profile_image").onChange(e);
              }}
              className="border border-gray-400 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-200
               rounded w-full p-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.profile_image && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.profile_image.message}
              </p>
            )}
            {preview && (
              <div className="mt-2">
                {" "}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-full border"
                />{" "}
              </div>
            )}
          </div>
          <div className="w-full font-bold text-white mt-3 px-4 py-2 rounded-md bg-blue-700 dark:bg-gray-600 border border-blue-800 dark:border-gray-700 shadow-sm">
            Contact Information
          </div>
        </div>

        <hr className="mt-4 border-gray-400 dark:border-gray-600" />

        {/* Submit Button */}
        <div className="mt-4 flex justify-end px-2 gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 font-bold transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              reset(defaultValues);
              setDob(null);
              setPreview(null);
            }}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 font-bold transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;
