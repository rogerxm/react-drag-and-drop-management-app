import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { User } from "../types/user";
import { generateUniqueId } from "../utils/uuidGenerator";
import { addNewUser } from "../store/userSlice";

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

export const NewUserForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

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
      return false;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Ingrese un correo electrónico válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

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

    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}

      <div>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Nombre Completo *"
          value={formData.name}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Correo Electrónico *"
          value={formData.email}
        />
        <input
          onChange={handleChange}
          type="text"
          name="phone"
          placeholder="Número de teléfono *"
          value={formData.phone}
        />
        <input
          onChange={handleChange}
          type="text"
          name="nationality"
          placeholder="Nacionalidad *"
          value={formData.nationality}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <input
          onChange={handleChange}
          type="text"
          name="street"
          placeholder="Calle *"
          value={formData.street}
        />
        <input
          onChange={handleChange}
          type="text"
          name="streetNumber"
          placeholder="Número *"
          value={formData.streetNumber}
        />
        <input
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="Ciudad *"
          value={formData.city}
        />
        <input
          onChange={handleChange}
          type="text"
          name="state"
          placeholder="Estado *"
          value={formData.state}
        />
        <input
          onChange={handleChange}
          type="text"
          name="country"
          placeholder="País *"
          value={formData.country}
        />
        <input
          onChange={handleChange}
          type="text"
          name="postcode"
          placeholder="Código Postal *"
          value={formData.postcode}
        />
        <input
          onChange={handleChange}
          type="url"
          name="imageUrl"
          placeholder="URL Imagen"
          value={formData.imageUrl}
        />
      </div>

      <button type="submit">Registrar Nuevo Usuario</button>
    </form>
  );
};
