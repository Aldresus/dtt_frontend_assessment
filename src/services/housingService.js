import axios from "axios";
const baseUrl = "https://api.intern.d-tt.nl/api/houses";

//get api key from .env file

const config = {
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
};

export const housingService = {
  async getHouses() {
    const response = await axios.get(baseUrl, config);
    return response.data;
  },

  async getHouseById(id) {
    const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
  },

  async createHouse(newHouseForm) {
    const response = await axios.post(baseUrl, newHouseForm, config);
    return response.data;
  },

  async updateHouse(id, updatedHouseData) {
    const response = await axios.post(
      `${baseUrl}/${id}`,
      updatedHouseData,
      config
    );
    return response.data;
  },

  async deleteHouse(id) {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  },

  async uploadHouseImage(id, image) {
    const response = await axios.post(`${baseUrl}/${id}/upload`, image, config);
    return response.data;
  },
};
