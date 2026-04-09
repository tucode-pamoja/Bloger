import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../components/layouts/MainLayout';
import Button from '../components/common/Button';
import Textarea from '../components/common/Textarea';
import Toast from '../components/common/Toast';
import { setGeneratedResult, resetEditor } from '../store/editorSlice';
import { addSavedReview } from '../store/savedSlice';
import { generateReviewMockAPI } from '../utils/apiMock';

const ResultPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category, keywords, generatedResult } = useSelector(state => state.editor);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (!generatedResult && keywords) {
            generateReviewMockAPI({ category, keywords, imageCount: 2 })
                .then(result => {
                    dispatch(setGeneratedResult(result));
                });
        }
    }, [category, keywords, generatedResult, dispatch]);

    const handleRestart = () => {
        dispatch(resetEditor());
        navigate('/', { replace: true });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedResult);
            setToastMessage('클립보드에 복사되었습니다! ✨');
            setToastVisible(true);
        } catch (e) {
            console.error('Failed to copy text', e);
        }
    };

    const handleSave = () => {
        const id = Math.random().toString(36).substr(2, 9);
        const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

        dispatch(addSavedReview({
            id,
            category,
            keywords,
            content: generatedResult,
            date
        }));

        setToastMessage('후기가 사이드바에 저장되었습니다! 📝');
        setToastVisible(true);
    };

    const isGenerating = !generatedResult;

    return (
        <MainLayout headerTitle="후기 확인">
            <div className="max-w-2xl mx-auto w-full pt-2 h-full flex flex-col space-y-8 animate-fade-in relative">

                <section className="flex-1 flex flex-col animate-slide-up">
                    <h2 className="text-[20px] font-bold tracking-tight mb-4 text-gray-900">
                        {isGenerating ? '후기를 작성 중입니다...' : '생성된 후기 초안입니다'}
                    </h2>

                    <Textarea
                        className="flex-1 min-h-[300px]"
                        value={isGenerating ? 'AI가 열심히 문장들을 조립하고 있습니다. 잠시만 기다려주세요 ✍️' : generatedResult}
                        onChange={(e) => dispatch(setGeneratedResult(e.target.value))}
                        readOnly={isGenerating}
                    />
                </section>

                {!isGenerating && (
                    <div className="flex gap-2 pt-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <Button variant="secondary" className="flex-1" onClick={handleRestart}>
                            새로 작성
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={handleSave}>
                            저장하기
                        </Button>
                        <Button className="flex-1" onClick={handleCopy}>
                            복사하기
                        </Button>
                    </div>
                )}

                {/* Toast Notification */}
                <Toast
                    message={toastMessage}
                    visible={toastVisible}
                    onClose={() => setToastVisible(false)}
                />
            </div>
        </MainLayout>
    );
};

export default ResultPage;
