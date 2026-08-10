// Action Types
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const ADD_EDUCATION = 'ADD_EDUCATION';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';
export const ADD_SKILL = 'ADD_SKILL';
export const REMOVE_SKILL = 'REMOVE_SKILL';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const ADD_SOCIAL = 'ADD_SOCIAL';
export const REMOVE_SOCIAL = 'REMOVE_SOCIAL';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action Creators
export const updateProfile = (profileData) => ({
  type: UPDATE_PROFILE,
  payload: profileData
});

export const addEducation = (education) => ({
  type: ADD_EDUCATION,
  payload: education
});

export const removeEducation = (index) => ({
  type: REMOVE_EDUCATION,
  payload: index
});

export const addSkill = (skill) => ({
  type: ADD_SKILL,
  payload: skill
});

export const removeSkill = (index) => ({
  type: REMOVE_SKILL,
  payload: index
});

export const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project
});

export const removeProject = (index) => ({
  type: REMOVE_PROJECT,
  payload: index
});

export const addSocial = (social) => ({
  type: ADD_SOCIAL,
  payload: social
});

export const removeSocial = (index) => ({
  type: REMOVE_SOCIAL,
  payload: index
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});
