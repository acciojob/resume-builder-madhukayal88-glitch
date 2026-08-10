import {
  UPDATE_PROFILE,
  ADD_EDUCATION,
  REMOVE_EDUCATION,
  ADD_SKILL,
  REMOVE_SKILL,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_SOCIAL,
  REMOVE_SOCIAL,
  SET_CURRENT_PAGE
} from './actions';

const initialState = {
  profile: {
    fname: '',
    lname: '',
    phone: '',
    address: '',
    url: ''
  },
  education: [],
  skills: [],
  projects: [],
  social: [],
  currentPage: 1
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };

    case ADD_EDUCATION:
      return {
        ...state,
        education: [...state.education, action.payload]
      };

    case REMOVE_EDUCATION:
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.payload)
      };

    case ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, action.payload]
      };

    case REMOVE_SKILL:
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.payload)
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.payload)
      };

    case ADD_SOCIAL:
      return {
        ...state,
        social: [...state.social, action.payload]
      };

    case REMOVE_SOCIAL:
      return {
        ...state,
        social: state.social.filter((_, i) => i !== action.payload)
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    default:
      return state;
  }
};

export default resumeReducer;
