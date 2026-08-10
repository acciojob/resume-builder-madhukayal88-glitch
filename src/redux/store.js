import { createStore } from 'redux';
import resumeReducer from './reducer';

const store = createStore(resumeReducer);

export default store;
