import axios from "axios";
import type { User } from "../types/user";

const API_URL = "https://randomuser.me/api/?results=10";

interface ApiResult {
  results: any[];
  info: any;
}

export const fetchUsers = async (): Promise<User[]> => {
  console.log("Iniciando consumo de la API");
  try {
    const response = await axios.get<ApiResult>(API_URL);

    // Array de usuarios
    const arrayUsers = response.data.results;

    // Normalizar y agregar el campo ID usando el UUID del nodo "login" de la respuesta de la API
    const users: User[] = arrayUsers.map((user) => ({
      ...user,
      id: user.login.uuid,
    }));

    // Regresa el array de tipo User[]
    return users;
  } catch (error) {
    console.error("Error al consumir la API", error);

    return [];
  }
};
