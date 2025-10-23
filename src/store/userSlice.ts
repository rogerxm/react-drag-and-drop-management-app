import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

interface UserState {
  availableUsers: User[];
  selectedUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  availableUsers: [],
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
      state.availableUsers = action.payload;
      state.loading = false;
    },

    // Agrega el nuevo usuario
    addNewUser: (state, action: PayloadAction<User>) => {
      state.availableUsers.unshift(action.payload);
    },

    // Mover usuario a la lista de seleccionados
    moveUserToSelected: (state, action: PayloadAction<User>) => {
      const userToMove = action.payload;
      // Quitar de availableUsers
      state.availableUsers = state.availableUsers.filter(
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
      // Añadir a availableUsers
      if (!state.availableUsers.find((user) => user.id === userToMove.id)) {
        state.availableUsers.push(userToMove);
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
