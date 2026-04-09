import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/layouts/MainLayout';
import Button from '../components/common/Button';
import Textarea from '../components/common/Textarea';
import ImageUploader from '../components/domains/ImageUploader';
import { setKeywords } from '../store/editorSlice';

const WritePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { keywords } = useSelector(state => state.editor);
    const [photoFiles, setPhotoFiles] = useState([]);

    const handleNext = () => {
        // console.log("Selected Photo Files:", photoFiles);
        navigate('/result');
    };

    return (
        <MainLayout headerTitle="기록하기">
            <div className="max-w-2xl mx-auto w-full pt-2 flex flex-col h-full space-y-8 pb-[30px] animate-fade-in">

                <section className="animate-slide-up">
                    <h2 className="text-[20px] font-bold tracking-tight mb-3 text-gray-900">사진을 올려주세요</h2>
                    <ImageUploader onImagesChange={setPhotoFiles} />
                </section>

                <section className="flex-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <h2 className="text-[20px] font-bold tracking-tight mb-2 text-gray-900">기억나는 점을 적어주세요</h2>
                    <p className="text-[14px] text-gray-500 mb-4">키워드나 짧은 문장으로 적어주셔도 좋습니다.</p>
                    <Textarea
                        value={keywords}
                        onChange={(e) => dispatch(setKeywords(e.target.value))}
                        placeholder="예) 메뉴가 다양함, 커피가 맛있음, 인테리어가 깔끔함..."
                        rows={6}
                    />
                </section>

                <div className="pt-4">
                    <Button block onClick={handleNext} disabled={!keywords.trim()}>
                        AI 후기 생성하기
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default WritePage;
