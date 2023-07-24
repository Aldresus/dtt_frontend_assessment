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
              icon="ic_plus_white@3x.png"
            />
            <!--        desktop create button        -->
            <ButtonComponent
              icon-pos="start"
              class="mobile-only no-bg text-color-white element-color-primary"
              icon="ic_plus_grey@3x.png"
            />
            <!--        mobile create button        -->
          </RouterLink>
          <!--        create new button        -->
        </div>
        <!--        title and create new button        -->

        <div class="flex flex-wrap gap-2 justify-content-between">
          <SearchBarComponent
            placeholder="Search for a house"
            v-model="search"
          />
          <div class="flex gap-1/2 sort-container">
            <ButtonComponent
              class="element-color-primary text-color-white sort-select"
              :label="sortWay === 'asc' ? 'Lower' : 'Higher'"
              @click="houseStore.toggleSortWay()"
            />
            <!--        sort way button        -->

            <SelectButtonComponent
              class="sort-select"
              :options="sortOptions"
              v-model="sortBy"
            />
            <!--        sort buttons        -->
          </div>
        </div>
        <!--        search bar and sort buttons        -->

        <div class="flex justify-content-start">
          <h2>
            {{
              houseStore.getFilteredHousesCount !== 0
                ? `${houseStore.getFilteredHousesCount} results found`
                : "No result found"
            }}
          </h2>
        </div>
        <!--        search results count        -->

        <RouterLink
          class="flex-column gap-1 align-items-center no-decoration text-color-primary"
          v-for="house in filteredHouses"
          :to="`/houses/${house.id}`"
          :key="house.id"
        >
          <HouseCardComponent
            :house="house"
            :editable="true"
            @deleteHouse="deleteHouse($event)"
          />
        </RouterLink>
        <!--        house cards        -->

        <div
          v-if="houseStore.getFilteredHousesCount === 0"
          class="h-full flex-column justify-content-center align-items-center gap-1 mt-3"
        >
          <img
            class="empty-image no-drag"
            src="@/assets/icons/img_empty_houses@3x.png"
            alt="no houses found"
          />
          <div class="text-center empty-state-message">
            <p>No results found.</p>
            <p>Please try another keyword.</p>
          </div>
        </div>
      </div>
      <!--        main container        -->
    </template>
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

const { filteredHouses, sortBy, sortWay, search } = storeToRefs(houseStore);

// fetch houses on page load, keeps the store up to date
houseStore.fetchHouses();

//sort houses
watch(sortBy, (value) => {
  houseStore.sortBy = value;
  houseStore.sortHouses();
});

//search houses
watch(search, (value) => {
  houseStore.search = value;
  houseStore.searchHouses();
});

const deleteHouse = (id) => {
  houseStore.deleteHouse(id);
};

const sortOptions = [
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Size",
    value: "size",
  },
  {
    label: "Construction year",
    value: "constructionYear",
  },
];
</script>

<style scoped>
.empty-image {
  width: 100%;
  max-width: 300px;
}
@media (max-width: 768px) {
  .sort-select {
    width: 100%;
  }
  .sort-container {
    flex-wrap: wrap;
  }
}
</style>
