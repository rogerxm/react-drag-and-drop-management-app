import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

export interface UserState {
  generalUsers: User[];
  selectedUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  generalUsers: [],
  selectedUsers: [],
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
      state.generalUsers = action.payload;
      state.loading = false;
    },

    // Agrega el nuevo usuario
    addNewUser: (state, action: PayloadAction<User>) => {
      state.generalUsers.unshift(action.payload);
    },

    // Mover usuario a la lista de seleccionados
    moveUserToSelected: (state, action: PayloadAction<User>) => {
      const userToMove = action.payload;
      // Quitar de generalUsers
      state.generalUsers = state.generalUsers.filter(
        (user) => user.id !== userToMove.id
      );

      // Añadir a selectedUsers
      if (!state.selectedUsers.find((user) => user.id === userToMove.id)) {
        state.selectedUsers.push(userToMove);
      }
    },

    // Mover usuario a la lista general
    moveUserToAvailable: (state, action: PayloadAction<User>) => {
      const userToMove = action.payload;
      // Quitar de selectedUsers
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== userToMove.id
      );
      // Añadir a generalUsers
      if (!state.generalUsers.find((user) => user.id === userToMove.id)) {
        state.generalUsers.push(userToMove);
      }
    },
  },
});

export const {
  setLoading,
  setInitialUsers,
  addNewUser,
  moveUserToAvailable,
  moveUserToSelected,
} = userSlice.actions;
export default userSlice.reducer;
