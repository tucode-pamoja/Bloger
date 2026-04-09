import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';
import savedReducer from './savedSlice';

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        saved: savedReducer,
    },
});
