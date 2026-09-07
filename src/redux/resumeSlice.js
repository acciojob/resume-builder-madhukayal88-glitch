import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: { fname: '', lname: '', phone: '', address: '', url: '' },
  education: [], // [{ id, courseName, completionYear, college, percentage }]
  skills: [],    // [{ id, skill }]
  projects: [],  // [{ id, projectName, techStack, description }]
  social: []     // [{ id, Social }]
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addEducation: (state) => {
      state.education.push({
        id: Date.now(),
        courseName: '',
        completionYear: '',
        college: '',
        percentage: ''
      });
    },
    updateEducation: (state, action) => {
      const { id, field, value } = action.payload;
      const item = state.education.find((e) => e.id === id);
      if (item) item[field] = value;
    },
    deleteEducation: (state, action) => {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },
    addSkill: (state) => {
      state.skills.push({ id: Date.now(), skill: '' });
    },
    updateSkill: (state, action) => {
      const { id, value } = action.payload;
      const item = state.skills.find((s) => s.id === id);
      if (item) item.skill = value;
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    },
    addProject: (state) => {
      state.projects.push({
        id: Date.now(),
        projectName: '',
        techStack: '',
        description: ''
      });
    },
    updateProject: (state, action) => {
      const { id, field, value } = action.payload;
      const item = state.projects.find((p) => p.id === id);
      if (item) item[field] = value;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addSocial: (state) => {
      state.social.push({ id: Date.now(), Social: '' });
    },
    updateSocial: (state, action) => {
      const { id, value } = action.payload;
      const item = state.social.find((s) => s.id === id);
      if (item) item.Social = value;
    },
    deleteSocial: (state, action) => {
      state.social = state.social.filter((s) => s.id !== action.payload);
    }
  }
});

export const {
  updateProfile,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addSocial,
  updateSocial,
  deleteSocial
} = resumeSlice.actions;

export default resumeSlice.reducer;
