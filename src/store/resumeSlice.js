import { createSlice } from "@reduxjs/toolkit";

/**
 * Single source of truth for the whole Resume Builder.
 *
 * State is kept in Redux so every section (Profile, Education, Skills,
 * Projects, Social) can add / edit / delete entries and the final resume
 * can be generated from the same store.
 */
const initialState = {
  // current visible page: 1..5 are the form sections, 6 is the final resume
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

  // id counters used to give every entry a stable React key
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
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },

    /* ---------------------------- EDUCATION ---------------------------- */
    addEducation: {
      reducer(state, action) {
        state.education.push({ id: state.nextEducationId++, ...action.payload });
      },
      prepare(payload) {
        return {
          payload: payload || {
            courseName: "",
            completionYear: "",
            college: "",
            percentage: "",
          },
        };
      },
    },
    updateEducation(state, action) {
      if (action.payload.field) {
        const item = state.education.find((e) => e.id === action.payload.id);
        if (item) item[action.payload.field] = action.payload.value;
      } else {
        const idx = state.education.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.education[idx] = { ...state.education[idx], ...action.payload };
      }
    },
    deleteEducation(state, action) {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },

    /* ----------------------------- SKILLS ------------------------------ */
    addSkill: {
      reducer(state, action) {
        const skillVal =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.skill || "";
        state.skills.push({ id: state.nextSkillId++, skill: skillVal });
      },
      prepare(skill) {
        return { payload: skill || "" };
      },
    },
    updateSkill(state, action) {
      const idx = state.skills.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) {
        if (action.payload.value !== undefined) {
          state.skills[idx].skill = action.payload.value;
        } else if (action.payload.skill !== undefined) {
          state.skills[idx].skill = action.payload.skill;
        }
      }
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
        return {
          payload: payload || {
            projectName: "",
            techStack: "",
            description: "",
          },
        };
      },
    },
    updateProject(state, action) {
      if (action.payload.field) {
        const item = state.projects.find((p) => p.id === action.payload.id);
        if (item) item[action.payload.field] = action.payload.value;
      } else {
        const idx = state.projects.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.projects[idx] = { ...state.projects[idx], ...action.payload };
      }
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },

    /* ----------------------------- SOCIAL ------------------------------ */
    addSocial: {
      reducer(state, action) {
        const val =
          typeof action.payload === "string"
            ? { Social: action.payload }
            : action.payload;
        state.social.push({ id: state.nextSocialId++, ...(val || { Social: "" }) });
      },
      prepare(payload) {
        return { payload: payload || { Social: "" } };
      },
    },
    updateSocial(state, action) {
      const idx = state.social.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) {
        if (action.payload.value !== undefined) {
          state.social[idx].Social = action.payload.value;
        } else if (action.payload.Social !== undefined) {
          state.social[idx].Social = action.payload.Social;
        }
      }
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
  deleteSocial,
  goNext,
  goBack,
  gotoPage,
  hydrate,
  reset,
} = resumeSlice.actions;

export default resumeSlice.reducer;
