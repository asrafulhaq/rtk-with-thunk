import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../helpers/api";

/**
 * Create new Team
 */
export const createTeam = createAsyncThunk("team/createTeam", async (data) => {
  try {
    const response = await API.post("/team", data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * Get All Team
 */
export const getAllTeam = createAsyncThunk("team/getAllTeam", async () => {
  try {
    const response = await API.get("/team");

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * Delete Team Member
 */
export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id) => {
  try {
    await API.delete(`/team/${id}`);

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});
