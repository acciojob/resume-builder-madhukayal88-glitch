import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fname: '', lname: '', phone: '', address: '', url: '', image: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => ({ ...state, ...action.payload }),
    resetProfile: () => initialState,
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
