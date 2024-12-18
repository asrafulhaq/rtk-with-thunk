import { createSlice } from "@reduxjs/toolkit";
import { todos } from "../../../data/todos";

// create todo slice
const todoSlice = createSlice({
  name: "kormotalika",
  initialState: {
    todos: [],
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    getAlltodos: (state) => {
      state.todos = todos;
    },
    createNewTodo: (state, action) => {
      state.todos.push({
        ...action.payload,
        id: Math.floor(Math.random() * 1000000),
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((data) => data.id != action.payload);
    },
  },
});

// export selectors

// export actions
export const { getAlltodos, createNewTodo, deleteTodo } = todoSlice.actions;

// export todo reducer
export default todoSlice.reducer;
