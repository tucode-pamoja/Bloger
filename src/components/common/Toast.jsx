import React, { useEffect } from 'react';

const Toast = ({ message, visible, onClose, duration = 2500 }) => {
    useEffect(() => {
        if (visible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-[100px] left-1/2 z-50 animate-toast-enter pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md text-white text-[14px] font-medium px-5 py-3 rounded-full flex items-center justify-center shadow-lg whitespace-nowrap">
                {message}
            </div>
        </div>
    );
};

export default Toast;
