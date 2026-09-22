import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [{ id: Date.now(), courseName: '', completionYear: '', college: '', percentage: '' }],
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    addEducation: (state) => {
      state.entries.push({ id: Date.now(), courseName: '', completionYear: '', college: '', percentage: '' });
    },
    updateEducation: (state, action) => {
      const { id, field, value } = action.payload;
      const entry = state.entries.find((e) => e.id === id);
      if (entry) entry[field] = value;
    },
    deleteEducation: (state, action) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addEducation, updateEducation, deleteEducation } = educationSlice.actions;
export default educationSlice.reducer;
