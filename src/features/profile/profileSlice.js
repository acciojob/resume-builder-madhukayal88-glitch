
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: { fname: '', lname: '', phone: '', address: '', url: '' },
  education: [], // Array of objects containing: courseName, completionYear, college, percentage
  skills: [],    // Array of strings or objects with skill
  projects: [],  // Array of objects containing: projectName, techStack, description
  socials: []    // Array of social links
};
