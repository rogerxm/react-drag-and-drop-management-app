import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchUsers } from "../api/userApi";
import {
  moveUserToAvailable,
  moveUserToSelected,
  setInitialUsers,
  setLoading,
} from "../store/userSlice";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DroppableUserList } from "../components/DroppableUserList";
import { Link } from "react-router";
import { BounceLoader } from "react-spinners";

export const HomePage = () => {
  const { generalUsers, selectedUsers, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      // Mostrar loader al iniciar la llamada
      dispatch(setLoading(true));

      // Obtener los usuarios
      const data = await fetchUsers();

      // Guardar los usuarios en el estado global
      dispatch(setInitialUsers(data));
    };

    if (generalUsers.length === 0 && selectedUsers.length === 0) {
      fetchInitialData();
    }
  }, []);

  // Se renderiza un loader si está cargando
  if (loading && generalUsers.length === 0 && selectedUsers.length === 0) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <p className="text-2xl font-bold">
          {/* Cargando usuarios desde la API */}
          <BounceLoader size={100} color="#484dc5" />
        </p>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const overId = over.id;
    const userToMove = active.data.current?.user;

    if (overId === "selected-list") {
      dispatch(moveUserToSelected(userToMove));
    } else if (overId === "general-list") {
      dispatch(moveUserToAvailable(userToMove));
    }

    console.log(generalUsers);
    console.log(selectedUsers);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto max-w-6xl p-8">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Panel Operativo</h1>
          <p className="text-lg text-gray-500">
            Arrastra a los usuarios para seleccionarlos
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <Link
            to="/users/new"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Agregar nuevo usuario
          </Link>
        </div>

        <div className="flex gap-5 justify-center">
          <DroppableUserList
            id="general-list"
            title="Lista de general de usuarios"
            users={generalUsers}
          />

          <DroppableUserList
            id="selected-list"
            title="Lista de usuarios seleccionados"
            users={selectedUsers}
          />
        </div>
      </div>
    </DndContext>
  );
};
