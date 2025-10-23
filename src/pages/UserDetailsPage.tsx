import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import type { RootState } from "../store/store";

export const UserDetailsPage = () => {
  // Obtener el ID del usuario de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Buscar al usuario en Redux
  const allUsers = useSelector((state: RootState) => [
    ...state.users.generalUsers,
    ...state.users.selectedUsers,
  ]);

  // Encontrar el usuario por el ID
  const user = allUsers.find((u) => u.id === id);

  // Mensaje si no hay usuario
  if (!user) {
    return (
      <div>
        <h2>Usuario no encontrado</h2>
        <p>El ID `{id}` no corresponde a ningún usuario</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  console.log(user);

  // Renderizar toda la información disponible
  const fullName = `${user.name?.title || ""}. ${user.name?.first || ""} ${
    user.name?.last || ""
  }`;
  const location = `${user.location.street.name} ${user.location.street.number}, ${user.location?.city}, ${user.location?.state}, ${user.location?.country} CP. ${user.location.postcode}`;
  const registrationDate = new Date(user.registered.date).toLocaleDateString();
  const profilePicture = user.picture?.large || "";

  return (
    <div>
      <button onClick={() => navigate("/")}>Volver al Listado</button>

      <div>
        <img src={profilePicture} alt={fullName} />

        <div>
          <h1>{fullName}</h1>

          <h3>Datos de Contacto</h3>
          <p>Correo Electrónico: {user.email}</p>
          <p>Teléfono: {user.phone}</p>

          <h3>Información Personal y Ubicación</h3>
          <p>Nacionalidad: {user.nat}</p>
          <p>Género: {user.gender}</p>
          <p>Dirección Completa: {location}</p>
          <p>ID Único: {user.id}</p>

          <h3>Datos de Registro</h3>
          <p>Fecha de Registro: {registrationDate}</p>
          <p>Edad: {user.registered?.age} años</p>
        </div>
      </div>
    </div>
  );
};
