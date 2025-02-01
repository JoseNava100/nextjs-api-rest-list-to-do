'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardComponent() {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Verificar si el usuario está autenticado al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login'); // Redirigir al login si no hay token
        }
    }, []);

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');

            // Hacer la solicitud de logout al backend (Laravel)
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
                },
            });

            if (response.ok) {
                localStorage.removeItem('authToken'); // Eliminar el token del localStorage
                router.push('/login'); // Redirigir al usuario a la página de login
            } else {
                console.error('Error during logout');
            }
        } catch (error) {
            console.error('An error occurred while logging out', error);
        }
    };

    // Mostrar confirmación antes de cerrar sesión
    const confirmLogout = () => {
        setShowConfirmation(true);
    };

    // Cancelar cierre de sesión
    const cancelLogout = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome to your dashboard!</p>
            <button
                onClick={confirmLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
                Cerrar sesión
            </button>

            {showConfirmation && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <p className="text-gray-700 mb-4">¿Estás seguro de que quieres cerrar sesión?</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Sí, cerrar sesión
                        </button>
                        <button
                            onClick={cancelLogout}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}