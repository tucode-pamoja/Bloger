import React from 'react';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={`
        w-full bg-gray-100/80 px-4 py-3.5 rounded-2xl text-[15px]
        text-gray-900 placeholder:text-gray-400
        outline-none border border-transparent
        focus:bg-white focus:border-gray-300 focus:shadow-sm focus:ring-4 focus:ring-gray-100
        transition-all duration-200
        ${className}
      `}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;
