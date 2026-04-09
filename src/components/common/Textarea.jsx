import React from 'react';

const Textarea = React.forwardRef(({ className = '', rows = 4, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            rows={rows}
            className={`
        w-full bg-gray-100/80 px-4 py-3.5 rounded-2xl text-[15px] leading-relaxed
        text-gray-900 placeholder:text-gray-400 resize-none
        outline-none border border-transparent
        focus:bg-white focus:border-gray-300 focus:shadow-sm focus:ring-4 focus:ring-gray-100
        transition-all duration-200
        ${className}
      `}
            {...props}
        />
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
