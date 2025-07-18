// src/services/userService.js

import axios from "axios";

export const getRandomUsers = async (results = 20) => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${results}`
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching users:", error);

    return [];
  }
};
