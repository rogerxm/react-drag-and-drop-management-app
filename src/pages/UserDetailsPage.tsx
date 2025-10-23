import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import type { RootState } from "../store/store";

const nationalities = [
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "US", name: "USA", flag: "🇺🇸" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "FR", name: "Francia", flag: "🇫🇷" },
  { code: "DE", name: "Alemania", flag: "🇩🇪" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "JP", name: "Japón", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
];

export const UserDetailsPage = () => {
  // Obtener el ID del usuario de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const buttonStyle =
    "px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700";

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
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Usuario no encontrado
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            El ID <span className=" text-red-500">{id}</span> no corresponde a
            ningún usuario.
          </p>
          <button onClick={() => navigate("/")} className={buttonStyle}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  console.log(user);

  const nationalityInfo = nationalities.find((nat) => nat.code === user.nat);
  const nationalityDisplay = nationalityInfo
    ? `${nationalityInfo.flag} ${user.nat}`
    : user.nat;

  // Renderizar toda la información disponible
  const fullName = `${user.name?.title || ""}. ${user.name?.first || ""} ${
    user.name?.last || ""
  }`;
  const location = `${user.location.street.name} ${user.location.street.number}, ${user.location?.city}, ${user.location?.state}, ${user.location?.country} CP. ${user.location.postcode}`;
  const registrationDate = new Date(user.registered.date).toLocaleDateString();
  const profilePicture = user.picture?.large || "";

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button className={buttonStyle} onClick={() => navigate("/")}>
            Volver al Listado
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-start bg-gray-50">
              <img
                className="w-40 h-40 rounded-full shadow-lg object-cover"
                src={profilePicture}
                alt={fullName}
              />
              <h1 className="text-2xl font-bold text-gray-900 mt-6 text-center">
                {fullName}
              </h1>
            </div>

            <div className="md:w-2/3 p-8 space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Datos de Contacto
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Correo Electrónico:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {user.email}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Teléfono:
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {user.phone}
                  </span>
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Información Personal y Ubicación
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Nacionalidad:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {nationalityDisplay}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Género:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {user.gender}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Dirección Completa:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {location}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                  ID Único:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {user.id}
                  </span>
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Datos de Registro
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Fecha de Registro:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {registrationDate}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Edad:{" "}
                  <span className="text-base font-medium text-gray-800 sm:text-right">
                    {user.registered.age} años
                  </span>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
