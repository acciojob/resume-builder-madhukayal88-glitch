import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from '../reducers/resumeReducer';

const store = configureStore({
  reducer: {
    resume: resumeReducer
  }
});

export default store;
