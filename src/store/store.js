import { legacy_createStore as createStore } from "redux";
import AppReducer from "../reducers/AppReducer";
import { initialState } from "../states/States";

const store = createStore(AppReducer, initialState);

export default store;
