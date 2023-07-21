<template>
  <MainLayout>
    <template v-slot>
      <div class="flex-column gap-1">
        <div class="flex justify-content-between align-items-center">
          <h1>Houses</h1>
          <RouterLink class="no-decoration" to="/houses/create">
            <ButtonComponent
              icon-pos="start"
              class="desktop-only text-color-white element-color-primary"
              :label="'CREATE NEW'"
              icon="ic_plus_white@3x.png" />
            <ButtonComponent
              icon-pos="start"
              class="mobile-only no-bg text-color-white element-color-primary"
              icon="ic_plus_grey@3x.png"
          /></RouterLink>
        </div>
        <div class="flex flex-wrap gap-2 justify-content-between">
          <SearchBarComponent
            placeholder="Search for a house"
            v-model="search"
          />

          <SelectButtonComponent :options="selectOptions" v-model="sortBy" />
        </div>
        <div class="flex justify-content-start">
          <h2>
            {{
              houseStore.getFilteredHousesCount !== 0
                ? `${houseStore.getFilteredHousesCount} results found`
                : "No result found"
            }}
          </h2>
        </div>
        <RouterLink
          class="flex-column gap-1 align-items-center no-decoration text-color-primary"
          v-for="house in filteredHouses"
          :to="`houses/${house.id}`"
          :key="house.id"
        >
          <HouseCardComponent :house="house" />
        </RouterLink></div
    ></template>
  </MainLayout>
</template>

<script setup>
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import HouseCardComponent from "@/components/HouseCardComponent.vue";
import SelectButtonComponent from "@/components/ui/SelectButtonComponent.vue";
import SearchBarComponent from "@/components/ui/SearchBarComponent.vue";
import { useHousingStore } from "@/stores/housingStore";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import MainLayout from "@/layouts/MainLayout.vue";

let houseStore = useHousingStore();

const { filteredHouses, sortBy, search } = storeToRefs(houseStore);

houseStore.fetchHouses();

watch(sortBy, (value) => {
  console.log("active", value);
  houseStore.sortBy = value;
  houseStore.sortHouses();
});

watch(search, (value) => {
  console.log(value);
  houseStore.search = value;
  houseStore.searchHouses();
  console.log("search", value);
});

const selectOptions = [
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Size",
    value: "size",
  },
  {
    label: "Bedrooms",
    value: "rooms.bedrooms",
  },
];

const test = () => {
  console.log("test");
};
</script>

<style scoped></style>
