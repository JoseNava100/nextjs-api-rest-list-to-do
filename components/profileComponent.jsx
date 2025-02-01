'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        ...data.data,
                        current_password: '',
                        password: '',
                        password_confirmation: '',
                    });
                } else {
                    throw new Error('Error getting user data');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user.current_password) {
            setError('You must enter your current password to confirm the changes.');
            return;
        }

        const payload = {
            name: user.name,
            username: user.username,
            email: user.email,
            current_password: user.current_password,
        };

        if (user.password) {
            payload.password = user.password;
            payload.password_confirmation = user.password_confirmation;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully');
                setUser({
                    ...user,
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                });
            } else {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join(', ');
                    setError(errorMessages);
                } else {
                    setError(data.message || 'Error updating profile');
                }
            }
        } catch (error) {
            setError('Server connection error');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Example: John Doe"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Example: johndoe"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Example: johndoe@example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current_password">
                        Current password
                    </label>
                    <input
                        type="password"
                        name="current_password"
                        value={user.current_password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        New Password (optional)
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Example: aas123asasa456asasa"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                        Confirm new password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={user.password_confirmation}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Example: aas123asasa456asasa"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Save changes
                    </button>
                    <Link
                        href="/dashboard"
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-center"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </form>
        </div>
    );
}