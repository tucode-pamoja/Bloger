import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedReviews: [],
};

export const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {
        addSavedReview: (state, action) => {
            // action.payload: { id, category, keywords, content, date }
            state.savedReviews.unshift(action.payload);
        },
        removeSavedReview: (state, action) => {
            // action.payload: id
            state.savedReviews = state.savedReviews.filter(review => review.id !== action.payload);
        }
    },
});

export const { addSavedReview, removeSavedReview } = savedSlice.actions;
export default savedSlice.reducer;
