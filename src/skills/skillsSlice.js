import { createSlice } from '@reduxjs/toolkit';

const initialState = { skills: [{ id: Date.now(), skill: '' }] };

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state) => { state.skills.push({ id: Date.now(), skill: '' }); },
    updateSkill: (state, action) => {
      const { id, value } = action.payload;
      const s = state.skills.find((x) => x.id === id);
      if (s) s.skill = value;
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSkill, updateSkill, deleteSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
