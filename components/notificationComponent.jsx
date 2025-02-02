'use client';

import { useEffect, useState } from 'react';

export default function Notification({ message, type, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 5000); 
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${bgColor}`}>
            {message}
        </div>
    );
}