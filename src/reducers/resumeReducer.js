import {
  UPDATE_PROFILE,
  ADD_EDUCATION,
  EDIT_EDUCATION,
  DELETE_EDUCATION,
  ADD_SKILL,
  DELETE_SKILL,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_SOCIAL,
  DELETE_SOCIAL,
  SET_CURRENT_PAGE,
  SAVE_RESUME,
  LOAD_RESUME
} from '../actions/resumeActions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  profile: {
    fname: '',
    lname: '',
    phone: '',
    address: '',
    url: '',
    image: null
  },
  education: [],
  skills: [],
  projects: [],
  socialMedia: [],
  currentPage: 0,
  savedResumes: []
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
        education: [...state.education, { ...action.payload, id: uuidv4() }]
      };

    case EDIT_EDUCATION:
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id ? { ...action.payload.education, id: edu.id } : edu
        )
      };

    case DELETE_EDUCATION:
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload)
      };

    case ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, { ...action.payload, id: uuidv4() }]
      };

    case DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload)
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, { ...action.payload, id: uuidv4() }]
      };

    case EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? { ...action.payload.project, id: project.id } : project
        )
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      };

    case ADD_SOCIAL:
      return {
        ...state,
        socialMedia: [...state.socialMedia, { ...action.payload, id: uuidv4() }]
      };

    case DELETE_SOCIAL:
      return {
        ...state,
        socialMedia: state.socialMedia.filter(social => social.id !== action.payload)
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case SAVE_RESUME:
      const resumeData = {
        id: uuidv4(),
        date: new Date().toISOString(),
        data: {
          profile: state.profile,
          education: state.education,
          skills: state.skills,
          projects: state.projects,
          socialMedia: state.socialMedia
        }
      };
      return {
        ...state,
        savedResumes: [...state.savedResumes, resumeData]
      };

    case LOAD_RESUME:
      return {
        ...state,
        profile: action.payload.profile,
        education: action.payload.education,
        skills: action.payload.skills,
        projects: action.payload.projects,
        socialMedia: action.payload.socialMedia
      };

    default:
      return state;
  }
};

export default resumeReducer;
