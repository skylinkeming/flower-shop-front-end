import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../util/Constants";

const initialState = {
  isLoading: false,
  clientList: [],
  error: "",
  totalPages: 1,
};

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        Config.url.API_URL + "/feed/clients?page=" +
          payload.page +
          (payload.searchKey ? "&searchKey=" + payload.searchKey : "")
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientList = action.payload.data.clients;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.data.message;
        alert(action.payload.response.data.message)
      });
  },
});

export default clientSlice.reducer;
