import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [{ id: Date.now(), projectName: '', techStack: '', description: '' }],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state) => {
      state.projects.push({ id: Date.now(), projectName: '', techStack: '', description: '' });
    },
    updateProject: (state, action) => {
      const { id, field, value } = action.payload;
      const p = state.projects.find((x) => x.id === id);
      if (p) p[field] = value;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
