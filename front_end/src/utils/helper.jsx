import React from "react";

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
