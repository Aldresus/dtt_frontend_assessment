import { defineStore } from "pinia";
import { housingService } from "@/services/housingService";
export const useHousingStore = defineStore("house", {
  state: () => ({
    houses: [],
    filteredHouses: [],
    selectedHouse: {
      id: null,
      location: {
        city: "",
        houseNumber: null,
        houseNumberAddition: "",
        street: "",
        zip: "",
      },
      image: "",
      constructionYear: null,
      price: null,
      size: null,
      description: "",
      hasGarage: false,
      rooms: {
        bathrooms: null,
        bedrooms: null,
      },
      madeByMe: null,
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
      await housingService.getHouseById(id).then((house) => {
        this.selectedHouse = house[0];
      });
    },
    selectedHouseToFormData() {
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
      data.append(
        "constructionYear",
        new Date(this.selectedHouse.constructionYear).getFullYear().toString()
      );
      data.append("hasGarage", this.selectedHouse.hasGarage);
      data.append("description", this.selectedHouse.description);

      return data;
    },
    async createHouse() {
      let data = this.selectedHouseToFormData();
      let response = await housingService
        .createHouse(data)
        .then(async (response) => {
          await this.uploadImage(response.id, this.selectedHouse.image);
          return response;
        });
      return response.id;
    },
    async updateHouse(id) {
      let data = this.selectedHouseToFormData();
      let response = await housingService
        .updateHouse(id, data)
        .then(async () => {
          await this.uploadImage(id, this.selectedHouse.image);
          return response;
        });
      return response;
    },
    async deleteHouse(id) {
      await housingService.deleteHouse(id).then(() => {
        this.fetchHouses();
      });
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
    resetSelectedHouse() {
      this.selectedHouse = {
        id: null,
        location: {
          city: "",
          houseNumber: null,
          houseNumberAddition: "",
          street: "",
          zip: "",
        },
        image: "",
        constructionYear: null,
        price: null,
        size: null,
        description: "",
        hasGarage: false,
        madeByMe: null,
        rooms: {
          bathrooms: null,
          bedrooms: null,
        },
      };
    },
  },
});
