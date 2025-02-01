'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        current_password: '', // Contraseña actual para confirmar cambios
        password: '', // Nueva contraseña (opcional)
        password_confirmation: '', // Confirmación de nueva contraseña
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los datos del usuario al cargar la página
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
                    throw new Error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Manejar el envío del formulario para actualizar el perfil
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validar que la contraseña actual esté presente
        if (!user.current_password) {
            setError('Debes ingresar tu contraseña actual para confirmar los cambios.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Perfil actualizado correctamente');
                // Limpiar campos de contraseña después de una actualización exitosa
                setUser({
                    ...user,
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                });
            } else {
                setError(data.errors || 'Error al actualizar el perfil');
            }
        } catch (error) {
            setError('Error de conexión con el servidor');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración del Perfil</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Nombre"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Nombre de usuario"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Correo electrónico"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current_password">
                        Contraseña actual
                    </label>
                    <input
                        type="password"
                        name="current_password"
                        value={user.current_password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Contraseña actual"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Nueva contraseña (opcional)
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Nueva contraseña"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={user.password_confirmation}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Confirmar nueva contraseña"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Guardar cambios
                    </button>
                    <Link
                        href="/dashboard"
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-center"
                    >
                        Regresar al Dashboard
                    </Link>
                </div>
            </form>
        </div>
    );
}