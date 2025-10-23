import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Manejar el loader
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Guarda los usuarios de la API
    setInitialUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setInitialUsers } = userSlice.actions;
export default userSlice.reducer;
