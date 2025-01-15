import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import teamReducer from "./features/team/teamSlice";
import studentReducer from "./features/student/studentSlice";

// create redux store
const store = configureStore({
  reducer: {
    kajkam: todoReducer,
    team: teamReducer,
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export store
export default store;
