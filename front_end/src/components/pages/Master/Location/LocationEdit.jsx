import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const LocationEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleBack = () => {
        navigate("/master/location/list");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Location Edit</h3>
                <button
                    onClick={handleBack}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
            <hr className='mt-3 mb-3 border-gray-200' />

        </div>
    )
}

export default LocationEdit
