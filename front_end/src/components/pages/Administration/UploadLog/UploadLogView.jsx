import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import { getUploadLogStatus } from "../../../../utils/helper";

const UploadLogView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const api_url = import.meta.env.VITE_API_URL;
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUploadLog = async () => {
        try {
            const res = await api.get(`${api_url}api/administration/uploadlog/view/${id}`);
            console.log(res);

            setLog(res.data || res);
        } catch (error) {
            console.error("Error fetching upload log:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUploadLog();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    }

    if (!log) {
        return <div className="p-6 text-center text-red-500">Log not found</div>;
    }

    let parsedErrors = [];
    try {
        parsedErrors = log.errors_reason ? JSON.parse(log.errors_reason) : [];
    } catch {
        parsedErrors = [];
    }


    return (
        <div className="mx-auto mt-6 bg-white  p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Upload Log Details</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-3 text-white py-1 bg-blue-500 rounded transition-transform duration-400 hover:scale-110 hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
            <hr className="my-4" />


            <div className="grid grid-cols-3 gap-y-4 gap-x-8 text-sm">
                <div>
                    <label className="block text-black-900 font-bold text-l  mb-2">File Name</label>
                    <p className="text-gray-800">{log.file_name || "-"}</p>
                </div>

                <div>
                    <label className="block text-black-900 font-bold text-l  mb-2">Status</label>
                    <p className="text-gray-800">{getUploadLogStatus(log.status)}</p>
                </div>

                <div>
                    <label className="block text-black-900 font-bold text-l  mb-2">Created By</label>
                    <p className="text-gray-800">
                        {log.created_by?.name || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-black-900 font-bold text-l  mb-2">Updated At</label>
                    <p className="text-gray-800">
                        {new Date(log.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <hr className="my-5" />

            <div>
                <label className="block text-black-900 font-bold text-l mb-2">Errors</label>
                {parsedErrors && parsedErrors.length > 0 ? (
                    <div className="space-y-2 text-sm">
                        {parsedErrors.map((e, index) => (
                            <div key={index} className="border border-red-200 rounded p-3 bg-red-50">
                                <p className="font-medium text-red-700 mb-2">Row {e.row}</p>
                                {Object.entries(e.errors || {}).map(([key, val]) => (
                                    <p key={key} className="text-red-600 ml-2">
                                        <span className="font-semibold">{key}:</span> {val}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No errors recorded.</p>
                )}
            </div>


        </div>
    );
};

export default UploadLogView;
