import { combineReducers } from "redux";

import todosReducer from "./todosSlice";
import filteredTodosReducer from "./filteredTodosSlice";

export const rootReducer = combineReducers({
  todosData: todosReducer,
  filteredTodos: filteredTodosReducer,
});
