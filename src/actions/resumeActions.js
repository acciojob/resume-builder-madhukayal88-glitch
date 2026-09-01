// Action Types
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const ADD_EDUCATION = 'ADD_EDUCATION';
export const EDIT_EDUCATION = 'EDIT_EDUCATION';
export const DELETE_EDUCATION = 'DELETE_EDUCATION';
export const ADD_SKILL = 'ADD_SKILL';
export const DELETE_SKILL = 'DELETE_SKILL';
export const ADD_PROJECT = 'ADD_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const ADD_SOCIAL = 'ADD_SOCIAL';
export const DELETE_SOCIAL = 'DELETE_SOCIAL';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SAVE_RESUME = 'SAVE_RESUME';
export const LOAD_RESUME = 'LOAD_RESUME';

// Action Creators
export const updateProfile = (profileData) => ({
  type: UPDATE_PROFILE,
  payload: profileData
});

export const addEducation = (education) => ({
  type: ADD_EDUCATION,
  payload: education
});

export const editEducation = (id, education) => ({
  type: EDIT_EDUCATION,
  payload: { id, education }
});

export const deleteEducation = (id) => ({
  type: DELETE_EDUCATION,
  payload: id
});

export const addSkill = (skill) => ({
  type: ADD_SKILL,
  payload: skill
});

export const deleteSkill = (id) => ({
  type: DELETE_SKILL,
  payload: id
});

export const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project
});

export const editProject = (id, project) => ({
  type: EDIT_PROJECT,
  payload: { id, project }
});

export const deleteProject = (id) => ({
  type: DELETE_PROJECT,
  payload: id
});

export const addSocial = (social) => ({
  type: ADD_SOCIAL,
  payload: social
});

export const deleteSocial = (id) => ({
  type: DELETE_SOCIAL,
  payload: id
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});

export const saveResume = () => ({
  type: SAVE_RESUME
});

export const loadResume = (data) => ({
  type: LOAD_RESUME,
  payload: data
});
