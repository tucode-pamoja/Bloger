import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ title = 'Bloger' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-lg border-b border-gray-100/60">
            <div className="max-w-4xl mx-auto flex items-center justify-between h-[72px] px-5 sm:px-8">
                <div className="flex-1 flex items-center justify-start">
                    {!isHome && (
                        <button
                            onClick={() => navigate(-1)}
                            className="px-3 py-2 flex items-center gap-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-95 text-gray-600 hover:text-gray-900 font-medium text-[15px]"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            <span className="hidden sm:inline">뒤로가기</span>
                        </button>
                    )}
                </div>

                <h1 className="flex-1 text-center font-bold text-[19px] tracking-tight text-gray-900">
                    {title}
                </h1>

                <div className="flex-1 flex justify-end">
                    {isHome && (
                        <span className="font-extrabold text-[22px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                            Bloger.
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
