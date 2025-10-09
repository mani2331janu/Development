import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalAdd = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex  justify-between">
        <h3 className="text-lg font-bold text-black-500">
          <span>Medical / </span>
          <span>Add</span>
        </h3>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-blue-500 text-white text-l font-bold rounded px-3 py-1 transition-transform duration-400 hover:scale-110  hover:bg-blue-700"
        >
          Back
        </button>
      </div>
      <hr className="mt-4 " />
      <form action="">
        <div className="felx flex-warp mx-2">
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"><input className="border rounded m-3" type="text" name="" id=""  placeholder="dd"/></div>


        </div>
      </form>
    </div>
  );
};

export default MedicalAdd;
