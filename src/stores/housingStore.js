import { defineStore } from "pinia";
import { housingService } from "@/services/housingService";
export const useHousingStore = defineStore("house", {
  state: () => ({
    houses: [],
    filteredHouses: [],
    recommendedHouses: [],
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
        if (this.selectedHouse.id) {
          this.setRecommendedHouses(3);
        }
      });
    },
    async fetchHouseById(id) {
      await housingService.getHouseById(id).then((house) => {
        this.selectedHouse = house[0];
        if (this.houses.length > 0) {
          this.setRecommendedHouses(3);
        }
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
      return await housingService.updateHouse(id, data).then(async () => {
        await this.uploadImage(id, this.selectedHouse.image);
        return id;
      });
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
    setRecommendedHouses(Number) {
      //number of houses with 20% similar price, size, rooms and garage as the selected house

      let price = this.selectedHouse.price;
      let size = this.selectedHouse.size;
      let rooms = this.selectedHouse.rooms;

      let minPrice = price - price * 0.2;
      let maxPrice = price + price * 0.2;
      let minSize = size - size * 0.2;
      let maxSize = size + size * 0.2;
      let minRooms = rooms.bedrooms - rooms.bedrooms * 0.2;
      let maxRooms = rooms.bedrooms + rooms.bedrooms * 0.2;
      let minBathrooms = rooms.bathrooms - rooms.bathrooms * 0.2;
      let maxBathrooms = rooms.bathrooms + rooms.bathrooms * 0.2;

      let recommendedHouses = this.houses.filter((house) => {
        return (
          house.id !== this.selectedHouse.id &&
          house.price >= minPrice &&
          house.price <= maxPrice &&
          house.size >= minSize &&
          house.size <= maxSize &&
          house.rooms.bedrooms >= minRooms &&
          house.rooms.bedrooms <= maxRooms &&
          house.rooms.bathrooms >= minBathrooms &&
          house.rooms.bathrooms <= maxBathrooms &&
          house.hasGarage === this.selectedHouse.hasGarage
        );
      });

      if (recommendedHouses.length < Number) {
        //if there are not enough houses with similar values, fill the rest with random houses which are not the selected house

        while (recommendedHouses.length < Number) {
          let availableHouses = this.houses.filter((house) => {
            return (
              house.id !== this.selectedHouse.id &&
              !recommendedHouses.includes(house)
            );
          });
          recommendedHouses.push(
            availableHouses[Math.floor(Math.random() * availableHouses.length)]
          );
        }
      }

      this.recommendedHouses = recommendedHouses.slice(0, Number); //return the first "number" recommended houses
    },
  },
});
