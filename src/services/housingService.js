import axios from "axios";
const baseUrl = "https://api.intern.d-tt.nl/api/houses";

//get api key from .env file

const config = {
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
};

export const housingService = {
  /**
   * Gets all houses.
   * @returns {Promise} houses
   */
  async getHouses() {
    const response = await axios.get(baseUrl, config);
    return response.data;
  },

  /**
   * Gets a house by its id.
   * @param {number} id id of the house.
   * @returns {Promise} house
   */
  async getHouseById(id) {
    const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
  },

  /**
   * Creates a new house.
   * @param {FormData} newHouseForm new house to be created.
   * @param {number} newHouseForm.price price of the house.
   * @param {number} newHouseForm.bedrooms number of bedrooms.
   * @param {number} newHouseForm.bathrooms number of bathrooms.
   * @param {number} newHouseForm.size size of the house.
   * @param {string} newHouseForm.streetName street name of the house.
   * @param {string} newHouseForm.houseNumber house number of the house.
   * @param {string} newHouseForm.numberAddition number addition of the house.
   * @param {string} newHouseForm.zip zip code of the house.
   * @param {string} newHouseForm.city city of the house.
   * @param {number} newHouseForm.constructionYear construction year of the house.
   * @param {boolean} newHouseForm.hasGarage does the house have a garage.
   * @param {string} newHouseForm.description description of the house.
   *
   *
   * @returns {Promise} newly created house.
   */
  async createHouse(newHouseForm) {
    const response = await axios.post(baseUrl, newHouseForm, config);
    return response.data;
  },

  /**
   * Updates a house.
   * @param {number} id id of the house to be updated.
   * @param {Object} updatedHouse updated house.
   * @param {number} updatedHouse.price price of the house.
   * @param {number} updatedHouse.bedrooms number of bedrooms.
   * @param {number} updatedHouse.bathrooms number of bathrooms.
   * @param {number} updatedHouse.size size of the house.
   * @param {string} updatedHouse.streetName street name of the house.
   * @param {string} updatedHouse.houseNumber house number of the house.
   * @param {string} updatedHouse.numberAddition number addition of the house.
   * @param {string} updatedHouse.zip zip code of the house.
   * @param {string} updatedHouse.city city of the house.
   * @param {number} updatedHouse.constructionYear construction year of the house.
   * @param {boolean} updatedHouse.hasGarage does the house have a garage.
   * @param {string} updatedHouse.description description of the house.
   *
   *
   * @returns {Promise} newly created house.
   */
  async updateHouse(id, updatedHouse) {
    const response = await axios.post(`${baseUrl}/${id}`, updatedHouse, config);
    return response.data;
  },

  /**
   * Deletes a house.
   * @param {number} id id of the house to be deleted.
   * @returns {Promise}
   */
  async deleteHouse(id) {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  },

  /**
   * Uploads an image to a house.
   * @param {number} id id of the house to upload the image to.
   * @param {string} image path to the image.
   * @returns {Promise}
   */
  async uploadHouseImage(id, image) {
    const response = await axios.post(`${baseUrl}/${id}/upload`, image, config);
    return response.data;
  },
};
