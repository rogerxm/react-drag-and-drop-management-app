import { configureStore } from "@reduxjs/toolkit";
import userReducer, { type UserState } from "./userSlice";

// Funcion para cargar el estado desde el localStorage
const loadFromLocalStorage = (): { users: UserState } | undefined => {
  try {
    const serializedState = localStorage.getItem("usersState");

    if (serializedState === null) return undefined;

    return {
      users: JSON.parse(serializedState),
    };
  } catch (error) {
    console.log("Error al cargar", error);
    return undefined;
  }

  return;
};

// Funcion para guardar el estado en el localStorage
const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.users);
    localStorage.setItem("usersState", serializedState);
  } catch (error) {
    console.error("Erorr al guardar", error);
  }
};

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
