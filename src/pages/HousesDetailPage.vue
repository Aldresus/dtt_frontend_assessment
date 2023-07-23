<template>
  <MainLayout>
    <template v-slot>
      <div>
        <DeleteModalComponent
          :house-id="selectedHouse.id"
          :show-modal="showModal"
          @deleteHouse="deleteHouse(selectedHouse.id)"
        />
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
                  class="w-full no-drag house-image"
                  :src="selectedHouse.image"
                  alt="house preview"
                />
              </div>
              <div class="bg-2 card house-card flex-column gap-1/2">
                <div
                  :class="{
                    'flex justify-content-between': selectedHouse.madeByMe,
                  }"
                >
                  <h2>
                    {{
                      `${selectedHouse.location.houseNumber} ${selectedHouse.location.street}`
                    }}
                  </h2>
                  <div v-if="selectedHouse.madeByMe" class="flex gap-1">
                    <router-link
                      class="flex align-items-center"
                      :to="`/houses/edit/${selectedHouse.id}`"
                    >
                      <ButtonComponent
                        class="no-bg no-padding"
                        icon-pos="start"
                        icon="ic_edit@3x.png"
                      ></ButtonComponent>
                    </router-link>
                    <ButtonComponent
                      class="no-bg no-padding"
                      icon="ic_delete@3x.png"
                      @click.prevent="showModal = true"
                    ></ButtonComponent>
                  </div>
                </div>
                <div class="listing-info text-color-secondary">
                  <img
                    class="house-icon"
                    src="@/assets/icons/ic_location@3x.png"
                    alt="location icon"
                  />
                  {{
                    `${selectedHouse.location.zip} ${selectedHouse.location.city}`
                  }}
                </div>
                <div class="flex gap-1 listing-info text-color-secondary">
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_price@3x.png"
                      alt="price icon"
                    />
                    <span>{{ utils.formatPrice(selectedHouse.price) }}</span>
                  </div>
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_size@3x.png"
                      alt="size icon"
                    />
                    <span>{{ `${selectedHouse.size} m2` }}</span>
                  </div>
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_construction_date@3x.png"
                      alt="construction date icon"
                    />
                    <span>{{
                      `Built in ${selectedHouse.constructionYear}`
                    }}</span>
                  </div>
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
                      src="@/assets/icons/ic_garage@3x.png"
                      alt="size icon"
                    />
                    <span>{{ selectedHouse.hasGarage ? "Yes" : "No" }}</span>
                  </div>
                </div>
                <div class="text-color-secondary">
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
import { utils } from "@/commons/utils";
import { ref } from "vue";
import DeleteModalComponent from "@/components/DeleteModalComponent.vue";

const route = useRoute();

const showModal = ref(false);

const deleteHouse = (id) => {
  houseStore.deleteHouse(id);
};

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
}
.house-image {
  height: 50vh;
  object-fit: cover;
}
</style>
