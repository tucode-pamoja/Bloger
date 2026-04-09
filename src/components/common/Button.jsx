import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    block = false,
    ...props
}) => {
    const baseStyles = "px-5 py-3.5 font-semibold text-[15px] transition-all active:scale-[0.98] flex items-center justify-center select-none";
    const roundedStyles = "rounded-2xl"; // Apple style semi-squircle

    const variants = {
        primary: "bg-gray-900 text-white hover:bg-black shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    };

    const blockStyles = block ? "w-full" : "w-auto";

    return (
        <button
            className={`${baseStyles} ${roundedStyles} ${variants[variant]} ${blockStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
