import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EmployeeAdd = () => {
    const navigate = useNavigate()
    const [dob, setDob] = useState(null) // for Date of Birth

    return (
        <div>
            <div className='flex justify-between '>
                <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                    <span>Employee / </span>
                    <span>Add</span>
                </h3>
                <button
                    onClick={() => navigate(-1)}
                    className='bg-blue-500 text-white cursor-pointer font-bold rounded px-3 py-1 hover:bg-blue-700'
                >
                    Back
                </button>
            </div>

            <hr className="mt-4 border-gray-400 dark:border-gray-600" />

            <form>
                <div className="flex flex-wrap">
                    <div className="w-full font-bold text-white mt-3 px-4 py-2 rounded-md bg-blue-700 dark:bg-gray-600 border border-blue-800 dark:border-gray-700 shadow-sm">
                        Basic Information
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/3 mt-3 px-2">
                        <label className="block text-gray-700 dark:text-white font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name..."
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='w-full sm:w-1/2 lg:w-1/3 mt-3 px-2'>
                        <label className='block text-gray-700 dark:text-white font-medium mb-2'>
                            Email
                        </label>
                        <input
                            type="text"
                            name='email'
                            placeholder='Enter Email...'
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='w-full sm:w-1/2 lg:w-1/3 mt-3 px-2'>
                        <label className='block text-gray-700 dark:text-white font-medium mb-2'>
                            Mobile No
                        </label>
                        <input
                            type="text"
                            name='mobile_no'
                            placeholder='Enter Mobile No...'
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='w-full sm:w-1/2 lg:w-1/3 mt-3 px-2'>
                        <label className='block text-gray-700 dark:text-white font-medium mb-2'>
                            Address
                        </label>
                        <input
                            type="text"
                            name='address'
                            placeholder='Enter Address...'
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className='w-full sm:w-1/2 lg:w-1/3 mt-3 px-2'>
                        <label className='block text-gray-700 dark:text-white font-medium mb-2'>
                            Date of Birth
                        </label>
                        <div className="w-full">
                            <DatePicker
                                selected={dob}
                                onChange={(date) => setDob(date)}
                                placeholderText="Select Date of Birth"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className='w-full sm:w-1/2 lg:w-1/3 mt-3 px-2'>
                        <label className='block text-gray-700 dark:text-white font-medium mb-2'>
                            Address
                        </label>
                        <input
                            type="text"
                            name='address'
                            placeholder='Enter Address...'
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                </div>

                <hr className="mt-4 border-gray-400 dark:border-gray-600" />

                {/* Submit Button */}
                <div className="mt-4 flex justify-end px-2">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 font-bold transition-colors"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmployeeAdd
