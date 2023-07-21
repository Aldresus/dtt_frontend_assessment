import { defineStore } from "pinia";
import { housingService } from "@/services/housingService";
export const useHousingStore = defineStore("house", {
  state: () => ({
    houses: [],
    filteredHouses: [],
    selectedHouse: {
      location: {
        city: "",
        houseNumber: "",
        houseNumberAddition: null,
        street: "",
        zip: 0,
      },
      image: "",
      constructionYear: 0,
      price: 0,
      size: 0,
      description: "",
      garage: false,
      rooms: {
        bathrooms: 0,
        bedrooms: 0,
      },
    },
    sortBy: "price",
    sortWay: "asc",
    search: "",
  }),
  getters: {
    getHousesCount() {
      return this.houses.length;
    },
    getFilteredHousesCount() {
      return this.filteredHouses.length;
    },
  },
  actions: {
    async fetchHouses() {
      housingService.getHouses().then((houses) => {
        this.houses = houses;
        this.filteredHouses = houses;
      });
    },
    async fetchHouseById(id) {
      this.selectedHouse = await housingService.getHouseById(id);
    },
    stateToFormData() {
      //convert state to form data for the post requests
      let data = new FormData();

      data.append("price", this.selectedHouse.price);
      data.append("bedrooms", this.selectedHouse.rooms.bedrooms);
      data.append("bathrooms", this.selectedHouse.rooms.bathrooms);
      data.append("size", this.selectedHouse.size);
      data.append("streetName", this.selectedHouse.location.street);
      data.append("houseNumber", this.selectedHouse.location.houseNumber);
      data.append(
        "numberAddition",
        this.selectedHouse.location.houseNumberAddition
      );
      data.append("zip", this.selectedHouse.location.zip);

      data.append("city", this.selectedHouse.location.city);
      data.append("constructionYear", this.selectedHouse.constructionYear);
      data.append("hasGarage", this.selectedHouse.garage);
      data.append("description", this.selectedHouse.description);

      return data;
    },
    async createHouse() {
      let data = this.stateToFormData();
      await housingService.createHouse(data).then((response) => {
        console.log("created house", response);
        this.uploadImage(response.id, this.selectedHouse.image).then(
          (response) => {
            console.log("uploaded image", response);
            this.fetchHouses();
          }
        );
      });
    },
    async updateHouse(id, updatedHouse) {
      await housingService.updateHouse(id, updatedHouse);
    },
    async deleteHouse(id) {
      await housingService.deleteHouse(id);
    },
    async uploadImage(id, image) {
      let data = new FormData();
      data.append("image", image);
      await housingService.uploadHouseImage(id, data);
    },
    searchHouses() {
      this.filteredHouses = this.houses.filter((house) => {
        return (
          house.location.city
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          `${house.location.houseNumber} ${house.location.street}`
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          house.location.zip.toString().includes(this.search.toLowerCase())
        );
      });
    },
    sortHouses() {
      console.log(this.sortBy);
      this.filteredHouses.sort((a, b) => {
        if (this.sortWay === "asc") {
          //todo implement sort by asc and desc
          return b[this.sortBy] - a[this.sortBy];
        } else {
          return a[this.sortBy] - b[this.sortBy];
        }
      });
    },
  },
});
