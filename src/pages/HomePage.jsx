import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Card from '../components/common/Card';
import { useDispatch } from 'react-redux';
import { setCategory } from '../store/editorSlice';

const CATEGORIES = [
    { id: 'restaurant', label: '맛집/식당', emoji: '🍽️' },
    { id: 'cafe', label: '카페/디저트', emoji: '☕️' },
    { id: 'beauty', label: '미용실/뷰티', emoji: '✂️' },
    { id: 'travel', label: '여행/숙박', emoji: '✈️' },
];

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectCategory = (category) => {
        dispatch(setCategory(category.id));
        navigate('/write');
    };

    return (
        <MainLayout headerTitle="카테고리 선택">
            <div className="pt-2 animate-fade-in text-center sm:text-left">
                <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight mb-3 text-gray-900 animate-slide-up">
                    어떤 장소에 다녀오셨나요?
                </h2>
                <p className="text-[16px] sm:text-[17px] text-gray-500 mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '50ms' }}>
                    카테고리를 선택하면 맞춤형 후기 양식이 제공됩니다.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {CATEGORIES.map((cat, index) => (
                        <Card
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat)}
                            className="hover:border-gray-300 transition-colors flex flex-col items-center justify-center py-10 sm:py-12 animate-slide-up shadow-sm hover:shadow-md"
                            style={{ animationDelay: `${100 + (index * 50)}ms` }}
                        >
                            <div className="text-4xl sm:text-5xl mb-4">{cat.emoji}</div>
                            <h3 className="font-semibold text-gray-900 text-[16px] sm:text-[18px]">{cat.label}</h3>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
