import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedReview } from '../../store/savedSlice';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Toast from '../common/Toast';

const Sidebar = ({ isOpen = true, onToggle }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedReviews } = useSelector(state => state.saved);

    // Modal & Toast States
    const [selectedReview, setSelectedReview] = useState(null);
    const [toastVisible, setToastVisible] = useState(false);

    const handleCopy = async (content) => {
        try {
            await navigator.clipboard.writeText(content);
            setToastVisible(true);
        } catch (e) {
            console.error('Failed to copy text', e);
        }
    };

    return (
        <aside className={`flex-shrink-0 bg-white border-r border-gray-100/60 hidden md:flex flex-col h-screen sticky top-0 z-40 transition-all duration-300 relative ${isOpen ? 'w-[280px]' : 'w-[80px]'}`}>

            {/* Toggle Button at the vertical center right edge */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-50">
                <button
                    onClick={onToggle}
                    title={isOpen ? "사이드바 접기" : "사이드바 펼치기"}
                    className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-all"
                >
                    {isOpen ? (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen ? (
                // --- Expanded View ---
                <div className="flex-1 flex flex-col w-[280px] overflow-hidden opacity-100 transition-opacity duration-300 delay-100">
                    <div className="p-6">
                        <span className="font-extrabold text-[24px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 cursor-pointer" onClick={() => navigate('/')}>
                            Bloger.
                        </span>
                    </div>

                    <div className="px-5 mb-6">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-900 text-white rounded-xl py-3 font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-black transition-colors active:scale-95 shadow-sm"
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            새 후기 작성
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 pb-6">
                        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
                            저장된 후기 ({savedReviews.length})
                        </h3>

                        {savedReviews.length === 0 ? (
                            <div className="text-center py-10 px-2 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-[13px] text-gray-500">아직 저장된 후기가 없습니다.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {savedReviews.map((review) => (
                                    <div
                                        key={review.id}
                                        onClick={() => setSelectedReview(review)}
                                        className="group relative block w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                                {review.category === 'restaurant' ? '식당' :
                                                    review.category === 'cafe' ? '카페' :
                                                        review.category === 'beauty' ? '미용실' : '기타'}
                                            </span>
                                            <span className="text-[11px] text-gray-400">{review.date}</span>
                                        </div>
                                        <h4 className="text-[14px] font-medium text-gray-900 truncate">
                                            {review.keywords || '키워드 없음'}
                                        </h4>
                                        <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
                                            {review.content}
                                        </p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(removeSavedReview(review.id));
                                            }}
                                            className="absolute top-2 right-2 p-1.5 bg-white shadow-sm border border-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 text-gray-400"
                                        >
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // --- Collapsed View ---
                <div className="flex-1 flex flex-col w-[80px] items-center pt-6 overflow-hidden opacity-100 transition-opacity duration-300 delay-100">
                    <span
                        className="font-extrabold text-[24px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        B.
                    </span>

                    <div className="mt-8 px-3 w-full flex justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors active:scale-95 shadow-sm"
                            title="새 후기 작성"
                        >
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto mt-8 w-full flex flex-col items-center space-y-4 pb-24 scrollbar-hide">
                        {savedReviews.map(review => (
                            <div
                                key={review.id}
                                onClick={() => setSelectedReview(review)}
                                title={review.keywords || '저장된 후기'}
                                className="w-11 h-11 bg-gray-50 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-gray-100 border border-gray-200 cursor-pointer shadow-sm active:scale-95 transition-transform"
                            >
                                <span className="text-[18px]">
                                    {review.category === 'restaurant' ? '🍽️' :
                                        review.category === 'cafe' ? '☕️' :
                                            review.category === 'beauty' ? '✂️' : '📝'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Read Modal */}
            <Modal
                isOpen={!!selectedReview}
                onClose={() => setSelectedReview(null)}
                title="저장된 후기 보기"
            >
                {selectedReview && (
                    <div className="space-y-5">
                        <div className="flex flex-col space-y-1">
                            <span className="text-[14px] font-bold text-gray-800">입력했던 키워드 💡</span>
                            <p className="text-[14px] text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {selectedReview.keywords || '키워드 없이 생성됨'}
                            </p>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-[14px] font-bold text-gray-800">생성된 본문 ✍️</span>
                            <div className="text-[15px] text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                                {selectedReview.content}
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button className="w-full" onClick={() => handleCopy(selectedReview.content)}>
                                복사하기
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Global Sidebar Toast for Copy Action */}
            <Toast
                message="클립보드에 복사되었습니다! ✨"
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
            />
        </aside>
    );
};

export default Sidebar;
