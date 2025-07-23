import axios from "axios";
import type { User } from "../interfaces/User";
 
const API_URL = import.meta.env.VITE_API_URL;
 
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}?results=50`);
  return response.data.results.map((user: any, index: number) => ({
    id: index + 1,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    city: user.location.city,
    country: user.location.country,
    picture: user.picture.thumbnail,
  }));
};
 