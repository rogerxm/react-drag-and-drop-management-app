import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { User } from "../types/user";
import { generateUniqueId } from "../utils/uuidGenerator";
import { addNewUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  gender: "male",
  street: "",
  streetNumber: "",
  city: "",
  state: "",
  country: "",
  postcode: "",
  imageUrl: "",
};

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

export const NewUserForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError(null);
  };

  // Funcion para validar los campos
  const validate = (): boolean => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.nationality.trim() ||
      !formData.street.trim() ||
      !formData.streetNumber.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.country.trim() ||
      !formData.postcode.trim()
    ) {
      setError("Complete todos los campos obligatorios.");
      setIsLoading(false);
      return false;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Ingrese un correo electrónico válido.");
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) return;

    const newUser: User = {
      id: generateUniqueId(),
      email: formData.email,
      gender: formData.gender,
      phone: formData.phone,
      nat: formData.nationality,
      name: {
        title: "Mr",
        first: formData.name.split(" ")[0] || "",
        last: formData.name.split(" ").slice(1).join(" ") || "",
      },
      location: {
        street: {
          number: +formData.streetNumber,
          name: formData.street,
        },
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postcode: +formData.postcode,
      },
      picture: {
        large: formData.imageUrl,
        medium: formData.imageUrl,
        thumbnail: formData.imageUrl,
      },
      registered: {
        date: new Date().toISOString(),
        age: 0,
      },
    };

    dispatch(addNewUser(newUser));

    setIsLoading(false);
    toast.success("Usuario registrado con éxito!");
    navigate("/");
    setFormData(initialFormState);
  };

  const inputStyle =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 transition-shadow";

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6">
        <button
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/")}
        >
          Volver al Listado
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-xl shadow-lg"
      >
        <h3 className="text-2xl font-semibold text-gray-700 text-center">
          Registrar Nuevo Usuario
        </h3>

        {error && (
          <div className="p-4 mt-2 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Nombre Completo *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="name"
              value={formData.name}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Correo Electrónico *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Número de teléfono *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="phone"
              value={formData.phone}
            />
          </div>

          <div>
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Nacionalidad *
            </label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="" disabled>
                Selecciona un país
              </option>
              {nationalities.map((nat) => (
                <option key={nat.code} value={nat.code}>
                  {nat.flag} {nat.name} ({nat.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Género
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Calle *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="street"
              value={formData.street}
            />
          </div>

          <div>
            <label
              htmlFor="streetNumber"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Número *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="streetNumber"
              value={formData.streetNumber}
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Ciudad *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="city"
              value={formData.city}
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Estado *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="state"
              value={formData.state}
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              País *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="country"
              value={formData.country}
            />
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Código Postal *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="text"
              name="postcode"
              value={formData.postcode}
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Imagen *
            </label>
            <input
              className={inputStyle}
              onChange={handleChange}
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar Nuevo Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};
