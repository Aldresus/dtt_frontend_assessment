import { defineStore } from "pinia";
import { housingService } from "@/services/housingService";
export const useHousingStore = defineStore("house", {
  state: () => ({
    houses: [],
    filteredHouses: [],
    selectedHouse: {},
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
    async createHouse(newHouse) {
      await housingService.createHouse(newHouse);
    },
    async updateHouse(id, updatedHouse) {
      await housingService.updateHouse(id, updatedHouse);
    },
    async deleteHouse(id) {
      await housingService.deleteHouse(id);
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
