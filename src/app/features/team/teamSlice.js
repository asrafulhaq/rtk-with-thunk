import { createSlice } from "@reduxjs/toolkit";
import { createTeam, deleteTeam, getAllTeam } from "./teamApiSlice";

// create team slice
const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
    success: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeam.fulfilled, (state, action) => {
        state.team = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.team.push(action.payload);
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.team = state.team.filter((data) => data.id !== action.payload);
      });
  },
});

// export selector

// export actions
export const {} = teamSlice.actions;

// export reducer
export default teamSlice.reducer;
