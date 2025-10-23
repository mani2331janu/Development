import React from "react";
// utils/formatDate.js
import dayjs from "dayjs";

export const displayDateFormat = (date) => {
    return date ? dayjs(date).format("DD-MM-YYYY") : "";
};


export const getUploadLogStatus = (status) => {

    switch (status) {
        case 1:
            return (
                <span className="bg-orange-400 text-white px-2 py-1 inline-flex items-center rounded-md text-sm">
                    In-Progress
                </span>
            );
        case 2:
            return (
                <span className="bg-red-500 text-white px-2 py-1 inline-flex items-center rounded-md text-sm">
                    Failed
                </span>
            );
        case 3:
            return (
                <span className="bg-green-500 text-white px-2 py-1 inline-flex items-center rounded-md text-sm">
                    Success
                </span>
            );
        case 4:
            return (
                <span className="bg-gray-400 text-white px-2 py-1 inline-flex items-center rounded-md text-sm">
                    Error
                </span>
            );
    }
};

export const displayStatus = (status) => {
  switch (Number(status)) {
    case 1:
      return "Active";
    case 0:
      return "Inactive"; 
    default:
      return "Unknown";
  }
};


