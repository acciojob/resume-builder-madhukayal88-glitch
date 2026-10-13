import { createStore, combineReducers } from 'redux';
import resumeReducer from './reducer';

const rootReducer = combineReducers({
  resume: resumeReducer
});

const store = createStore(rootReducer);

export default store;
