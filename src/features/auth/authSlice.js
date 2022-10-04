import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../util/Constants";

const initialState = {
  isLoading: false,
  isSuccess: false,
  userName: "",
  isLogin: false,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(Config.url.API_URL + "/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      state.isLogin = false;
      state.userName = "";
      window.location.href = window.location.origin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userName = action.payload.data.userName;
        localStorage.setItem("userName", action.payload.data.userName);
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("userId", action.payload.data.userId);
        sessionStorage.removeItem("beforeLoginUrl")
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.data.message;
        alert(state.error);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
