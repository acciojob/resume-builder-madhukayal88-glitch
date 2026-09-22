import * as types from "./actionTypes";

const initialState = {
  step: 1,
  profile: { fname: "", lname: "", phone: "", address: "", url: "" },
  education: [{ id: Date.now(), courseName: "", completionYear: "", college: "", percentage: "" }],
  skills: [{ id: Date.now(), skill: "" }],
  projects: [{ id: Date.now(), projectName: "", techStack: "", description: "" }],
  socialMedia: [{ id: Date.now(), Social: "" }]
};

export const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEXT_STEP:
      return { ...state, step: state.step + 1 };
    case types.BACK_STEP:
      return { ...state, step: Math.max(1, state.step - 1) };
    
    case types.UPDATE_PROFILE:
      return { ...state, profile: { ...state.profile, [action.payload.name]: action.payload.value } };

    case types.ADD_EDUCATION:
      return { ...state, education: [...state.education, { id: Date.now(), courseName: "", completionYear: "", college: "", percentage: "" }] };
    case types.UPDATE_EDUCATION:
      return {
        ...state,
        education: state.education.map(edu => edu.id === action.payload.id ? { ...edu, [action.payload.name]: action.payload.value } : edu)
      };
    case types.DELETE_EDUCATION:
      return { ...state, education: state.education.filter(edu => edu.id !== action.payload) };

    case types.ADD_SKILL:
      return { ...state, skills: [...state.skills, { id: Date.now(), skill: "" }] };
    case types.UPDATE_SKILL:
      return {
        ...state,
        skills: state.skills.map(sk => sk.id === action.payload.id ? { ...sk, [action.payload.name]: action.payload.value } : sk)
      };
    case types.DELETE_SKILL:
      return { ...state, skills: state.skills.filter(sk => sk.id !== action.payload) };

    case types.ADD_PROJECT:
      return { ...state, projects: [...state.projects, { id: Date.now(), projectName: "", techStack: "", description: "" }] };
    case types.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(proj => proj.id === action.payload.id ? { ...proj, [action.payload.name]: action.payload.value } : proj)
      };
    case types.DELETE_PROJECT:
      return { ...state, projects: state.projects.filter(proj => proj.id !== action.payload) };

    case types.ADD_SOCIAL:
      return { ...state, socialMedia: [...state.socialMedia, { id: Date.now(), Social: "" }] };
    case types.UPDATE_SOCIAL:
      return {
        ...state,
        socialMedia: state.socialMedia.map(soc => soc.id === action.payload.id ? { ...soc, [action.payload.name]: action.payload.value } : soc)
      };
    case types.DELETE_SOCIAL:
      return { ...state, socialMedia: state.socialMedia.filter(soc => soc.id !== action.payload) };

    default:
      return state;
  }
};
