import { createStore } from "redux";
import { resumeReducer } from "./reducer";

const store = createStore(
  resumeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
