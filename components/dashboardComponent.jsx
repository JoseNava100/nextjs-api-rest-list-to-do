'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskManager from './taskComponent';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function DashboardComponent() {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('authToken');
                router.push('/login');
            }
        } catch (error) {
            console.error('An error occurred while logging out', error);
        }
    };

    const confirmLogout = () => {
        setShowConfirmation(true);
    };

    const cancelLogout = () => {
        setShowConfirmation(false);
    };

    const handleViewProfile = () => {
        router.push('/dashboard/profile');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-2 flex justify-end items-center space-x-4">
                    <button
                        onClick={handleViewProfile}
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        title="View Profile"
                    >
                        <FaUser className="w-6 h-6" />
                    </button>

                    <button
                        onClick={confirmLogout}
                        className="text-gray-700 hover:text-red-600 transition-colors duration-200"
                        title="Sign Out"
                    >
                        <FaSignOutAlt className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <main className="flex-grow pt-16">
                <div className="container mx-auto p-4">
                    <TaskManager />
                </div>
            </main>

            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <p className="text-gray-700 mb-4">Are you sure you want to log out?</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Continue
                            </button>
                            <button
                                onClick={cancelLogout}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}