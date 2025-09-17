import React from "react";

const Profile = () => {
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex justify-between gap-6">
                {/* Left column */}
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-md">
                    Left content
                </div>

                {/* Right column */}
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-md">
                    Right content
                </div>
            </div>
        </div>
    );
};

export default Profile;
