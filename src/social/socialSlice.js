import { createSlice } from '@reduxjs/toolkit';

const initialState = { social: [{ id: Date.now(), Social: '' }] };

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    addSocial: (state) => { state.social.push({ id: Date.now(), Social: '' }); },
    updateSocial: (state, action) => {
      const { id, value } = action.payload;
      const s = state.social.find((x) => x.id === id);
      if (s) s.Social = value;
    },
    deleteSocial: (state, action) => {
      state.social = state.social.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSocial, updateSocial, deleteSocial } = socialSlice.actions;
export default socialSlice.reducer;
