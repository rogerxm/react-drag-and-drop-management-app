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
import { NewUserForm } from "../components/NewUserForm";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DroppableUserList } from "../components/DroppableUserList";

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
    return <div>Cargando usuarios desde la API...</div>;
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
      <div>
        <h3>Lista de Usuarios</h3>

        <div>
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

        <div>
          <h4>Añadir Nuevo Usuario</h4>
          <NewUserForm />
        </div>
      </div>
    </DndContext>
  );
};
