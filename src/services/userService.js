
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export default {
  fetchUsers,
};
