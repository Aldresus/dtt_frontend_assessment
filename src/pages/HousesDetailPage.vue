<template>
  <MainLayout>
    <template v-slot>
      <div>
        <DeleteModalComponent
          v-if="selectedHouse.madeByMe && selectedHouse.id"
          :house-id="selectedHouse.id"
          :show-modal="showModal"
          @deleteHouse="deleteHouse($event)"
          @close-modal="closeModal"
        />
        <!--        modal for deleting        -->

        <div class="flex-column gap-1/2">
          <RouterLink to="/houses" class="no-decoration">
            <ButtonComponent
              class="text-color-primary desktop-only no-bg no-padding"
              icon-pos="start"
              label="Back to overview"
              icon="ic_back_grey@3x.png"
              type="button"
          /></RouterLink>
          <!--        desktop back button        -->

          <div class="flex align-items-center justify-content-between mb-1">
            <RouterLink to="/houses" class="mobile-only no-decoration">
              <ButtonComponent
                class="text-color-primary no-bg no-padding"
                icon-pos="start"
                icon="ic_back_grey@3x.png"
                type="button"
            /></RouterLink>
            <!--        mobile back button        -->

            <h1>House detail</h1>
          </div>
          <!--       title and mobile back button        -->

          <div class="flex gap-2 detail-container">
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
              <!--        house image        -->

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
                  <!--        house address        -->

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
                  <!--        edit and delete buttons        -->
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
                <!--        location        -->

                <div class="flex gap-1 listing-info text-color-secondary">
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_price@3x.png"
                      alt="price icon"
                    />
                    <span>{{ utils.formatPrice(selectedHouse.price) }}</span>
                  </div>
                  <!--        price        -->

                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_size@3x.png"
                      alt="size icon"
                    />
                    <span>{{ `${selectedHouse.size} m2` }}</span>
                  </div>
                  <!--        size        -->

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
                  <!--        construction year        -->
                </div>
                <!--        price, size and construction year        -->

                <div class="flex gap-1 listing-info text-color-secondary">
                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_bed@3x.png"
                      alt="bed icon"
                    />
                    <span>{{ selectedHouse.rooms.bedrooms }}</span>
                  </div>
                  <!--        bedrooms        -->

                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_bath@3x.png"
                      alt="bath icon"
                    />
                    <span>{{ selectedHouse.rooms.bathrooms }}</span>
                  </div>
                  <!--        bathrooms        -->

                  <div>
                    <img
                      class="house-icon"
                      src="@/assets/icons/ic_garage@3x.png"
                      alt="size icon"
                    />
                    <span>{{ selectedHouse.hasGarage ? "Yes" : "No" }}</span>
                  </div>
                  <!--        garage        -->
                </div>
                <!--        bedrooms, bathrooms and garage        -->
                <div class="text-color-secondary">
                  {{ selectedHouse.description }}
                </div>
              </div>
              <!--        details card        -->
            </div>
            <!--        details        -->

            <div class="recommended-houses flex-column gap-1">
              <h2>Recommended for you</h2>
              <RouterLink
                v-if="recommendedHouses.length > 0"
                class="no-decoration text-color-primary"
                v-for="recommendedHouse in recommendedHouses"
                :to="`/houses/${recommendedHouse.id}`"
              >
                <HouseCardComponent :house="recommendedHouse" small />
              </RouterLink>
            </div>
            <!--        recommended houses        -->
          </div>
          <!--        house details main container        -->
        </div>
        <!--        house details        -->
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useHousingStore } from "@/stores/housingStore";
import { storeToRefs } from "pinia";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import HouseCardComponent from "@/components/HouseCardComponent.vue";
import { utils } from "@/commons/utils";
import { ref } from "vue";
import DeleteModalComponent from "@/components/DeleteModalComponent.vue";

const route = useRoute();
const router = useRouter();

const showModal = ref(false);

const deleteHouse = (id) => {
  houseStore.deleteHouse(id);
  router.push("/houses");
};

const closeModal = () => {
  showModal.value = false;
};

const houseStore = useHousingStore();
houseStore.fetchHouseById(route.params.id);

onBeforeRouteUpdate((to, from, next) => {
  // react to route changes when a recommended house is clicked
  houseStore.fetchHouseById(to.params.id);
  next();
});

let { selectedHouse, recommendedHouses } = storeToRefs(houseStore);
</script>

<style scoped>
.detailed-house {
  width: 100%;
  max-width: 80vw;
}
.recommended-houses {
  width: 100%;
  max-width: 30vw;
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

@media (max-width: 768px) {
  .detailed-house {
    width: 100%;
    max-width: unset;
  }
  .recommended-houses {
    width: 100%;
    max-width: unset;
    height: unset;
  }
  .detail-container {
    flex-wrap: wrap;
  }
}
</style>
