<template>
  <MainLayout>
    <template v-slot>
      <div>
        <div class="flex-column gap-1">
          <div>
            <RouterLink to="/houses" class="no-decoration">
              <ButtonComponent
                class="text-color-primary desktop-only no-bg no-padding"
                icon-pos="start"
                label="Back to overview"
                icon="ic_back_grey@3x.png"
                type="button"
            /></RouterLink>
          </div>
          <div class="flex gap-2">
            <div class="flex-column detailed-house">
              <div
                class="house-image-container overflow-hidden flex justify-content-center align-items-center"
              >
                <img
                  class="w-full no-drag"
                  :src="selectedHouse.image"
                  alt="house preview"
                />
              </div>
              <div class="bg-2 card house-card">
                <h2>
                  {{
                    `${selectedHouse.location.houseNumber} ${selectedHouse.location.street}`
                  }}
                </h2>
                <div class="text-color-secondary">
                  {{ `€ ${selectedHouse.price}` }}
                </div>
                <div class="listing-info text-color-tertiary">
                  {{
                    `${selectedHouse.location.zip} ${selectedHouse.location.city}`
                  }}
                </div>
                <div class="flex gap-1 listing-info text-color-secondary">
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_bed@3x.png"
                      alt="bed icon"
                    />
                    <span>{{ selectedHouse.rooms.bedrooms }}</span>
                  </div>
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_bath@3x.png"
                      alt="bath icon"
                    />
                    <span>{{ selectedHouse.rooms.bathrooms }}</span>
                  </div>
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_size@3x.png"
                      alt="size icon"
                    />
                    <span>{{ `${selectedHouse.size} m2` }}</span>
                  </div>
                </div>
                <div>
                  {{ selectedHouse.description }}
                </div>
              </div>
            </div>
            <div class="recommended-houses flex-column gap-1">
              <RouterLink
                class="no-decoration text-color-primary"
                v-for="recommendedHouse in filteredHouses.slice(0, 3)"
                :to="`/houses/${recommendedHouse.id}`"
              >
                <HouseCardComponent :house="recommendedHouse" small
              /></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useHousingStore } from "@/stores/housingStore";
import { storeToRefs } from "pinia";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import HouseCardComponent from "@/components/HouseCardComponent.vue";

const route = useRoute();

const houseStore = useHousingStore();
houseStore.fetchHouseById(route.params.id);

onBeforeRouteUpdate((to, from, next) => {
  houseStore.fetchHouseById(to.params.id);
  next();
});

let { selectedHouse, filteredHouses } = storeToRefs(houseStore);
</script>

<style scoped>
.detailed-house {
  width: 100%;
  max-width: 80vw;
}
.recommended-houses {
  width: 100%;
  max-width: 20vw;
  height: 10vh;
}

.house-card {
  border-radius: 0 0 8px 8px;
}

.house-image-container {
  width: 100%;
  height: 50vh;
}
</style>
