import { createSlice } from "@reduxjs/toolkit";

/**
 * Single source of truth for the whole Resume Builder.
 * State is kept in Redux so every section (Profile, Education, Skills,
 * Projects, Social) can add / edit / delete entries and the final resume
 * can be generated from the same store.
 */
const initialState = {
  // current visible page: 1..5 are form sections, 6 is the final resume
  page: 1,

  profile: {
    fname: "",
    lname: "",
    phone: "",
    address: "",
    url: "",
  },

  education: [],
  skills: [],
  projects: [],
  social: [],

  // id counters used to give every entry a stable key
  nextEducationId: 1,
  nextSkillId: 1,
  nextProjectId: 1,
  nextSocialId: 1,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    /* ----------------------------- PROFILE ----------------------------- */
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },

    /* ---------------------------- EDUCATION ---------------------------- */
    addEducation: {
      reducer(state, action) {
        state.education.push({ id: state.nextEducationId++, ...action.payload });
      },
      prepare(payload) {
        return { payload };
      },
    },
    updateEducation(state, action) {
      const idx = state.education.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.education[idx] = action.payload;
    },
    deleteEducation(state, action) {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },

    /* ----------------------------- SKILLS ------------------------------ */
    addSkill: {
      reducer(state, action) {
        state.skills.push({ id: state.nextSkillId++, skill: action.payload });
      },
      prepare(skill) {
        return { payload: skill };
      },
    },
    updateSkill(state, action) {
      const idx = state.skills.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.skills[idx] = action.payload;
    },
    deleteSkill(state, action) {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    },

    /* ---------------------------- PROJECTS ----------------------------- */
    addProject: {
      reducer(state, action) {
        state.projects.push({ id: state.nextProjectId++, ...action.payload });
      },
      prepare(payload) {
        return { payload };
      },
    },
    updateProject(state, action) {
      const idx = state.projects.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.projects[idx] = action.payload;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },

    /* ----------------------------- SOCIAL ------------------------------ */
    addSocial: {
      reducer(state, action) {
        state.social.push({ id: state.nextSocialId++, ...action.payload });
      },
      prepare(payload) {
        return { payload };
      },
    },
    updateSocial(state, action) {
      const idx = state.social.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.social[idx] = action.payload;
    },
    deleteSocial(state, action) {
      state.social = state.social.filter((s) => s.id !== action.payload);
    },

    /* --------------------------- NAVIGATION ---------------------------- */
    goNext(state) {
      if (state.page < 6) state.page += 1;
    },
    goBack(state) {
      if (state.page > 1) state.page -= 1;
    },
    gotoPage(state, action) {
      state.page = action.payload;
    },

    /* --------------------------- PERSISTENCE --------------------------- */
    hydrate(state, action) {
      const data = action.payload || {};
      return { ...state, ...data, page: state.page };
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  setProfile,
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
  deleteSocial,
  goNext,
  goBack,
  gotoPage,
  hydrate,
  reset,
} = resumeSlice.actions;

export default resumeSlice.reducer;
