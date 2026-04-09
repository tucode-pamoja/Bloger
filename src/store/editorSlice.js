import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: null,      // 식당, 카페, 미용실 등
    photos: [],          // 업로드한 사진
    keywords: '',        // 소스 / 메모
    generatedResult: '', // AI가 생성한 결과물
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setKeywords: (state, action) => {
            state.keywords = action.payload;
        },
        setGeneratedResult: (state, action) => {
            state.generatedResult = action.payload;
        },
        resetEditor: () => initialState,
    },
});

export const { setCategory, setKeywords, setGeneratedResult, resetEditor } = editorSlice.actions;
export default editorSlice.reducer;
