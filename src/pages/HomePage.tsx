import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchUsers } from "../api/userApi";
import { setInitialUsers, setLoading } from "../store/userSlice";

export const HomePage = () => {
  const { users, loading } = useSelector((state: RootState) => state.users);
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

    fetchInitialData();
  }, []);

  // Se renderiza un loader si está cargando
  if (loading) {
    return <div>Cargando usuarios desde la API...</div>;
  }

  return (
    <>
      <div>
        <h2>Lista de Usuarios</h2>

        <ul>
          {/* Listado de Usuarios */}
          {users.map((user) => (
            <li key={user.id}>
              <p>
                {user.name.first} {user.name.last}
              </p>
              <img src={user.picture.medium} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
