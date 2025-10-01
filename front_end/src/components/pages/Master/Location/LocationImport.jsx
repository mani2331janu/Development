import React from 'react'
import { useNavigate } from 'react-router-dom'
import sampleFile from "../../../../assets/Excel/Master/LocationMaster.xlsx"

const LocationImport = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/master/location/list")
    }
    const handelSampleDownload = () => {
        const link = document.createElement("a");
        link.href = sampleFile;
        link.download = "sample_location.xlsx";
        link.click();
    }
    return (
        <div className='p-4'>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Location Import</h3>
                <div className='flex gap-2'>
                    <button
                        onClick={handelSampleDownload}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Sample Download
                    </button>
                    <button
                        onClick={handleBack}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Back
                    </button>
                </div>
            </div>

            <hr className='mt-3 mb-3 border-gray-200' />

            <form>
                <div className="w-1/2 px-2 mb-4">
                    <label className="block mb-1 font-medium">Upload file</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                        focus:outline-none file:bg-gray-800 file:text-white file:border-0 
                        file:rounded-s-lg file:px-4 file:py-2 file:cursor-pointer
                        hover:file:bg-gray-700"
                    />
                </div>

                <hr className="mt-3 mb-3 border-gray-200" />

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
            </form>

        </div>
    )
}

export default LocationImport
