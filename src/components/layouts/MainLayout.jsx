import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = ({ children, headerTitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="bg-gray-50 min-h-screen flex text-gray-900 font-sans">
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 flex flex-col min-w-0 w-full relative">
                {headerTitle && <Header title={headerTitle} />}

                {/* Blog/Web container - Max width 4xl (~896px) for readable spacious layout */}
                <main className="w-full max-w-4xl mx-auto flex-1 overflow-visible px-5 sm:px-8 py-8 sm:py-12">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
