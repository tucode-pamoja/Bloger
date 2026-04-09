import React from 'react';

const Card = ({ children, className = '', padded = true, onClick }) => {
    const paddingStyles = padded ? 'p-5' : '';
    const clickableStyles = onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : '';

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-[24px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-50 ${paddingStyles} ${clickableStyles} ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
