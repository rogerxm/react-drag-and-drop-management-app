import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { UserDetailsPage } from "./pages/UserDetailsPage.tsx";
import "./App.css";
import { NewUserForm } from "./components/NewUserForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users/:id",
    element: <UserDetailsPage />,
  },
  {
    path: "/users/new",
    element: <NewUserForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
