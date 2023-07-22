<template>
  <MainLayout :background-image="true">
    <template v-slot>
      <div class="flex-column gap-1/2 listing-creation">
        <RouterLink :to="backRoute" class="no-decoration">
          <ButtonComponent
            class="text-color-primary desktop-only no-bg no-padding"
            icon-pos="start"
            :label="isEdit ? 'Back to detail page' : 'Back to overview'"
            icon="ic_back_grey@3x.png"
        /></RouterLink>
        <div class="flex align-items-center justify-content-between mb-1">
          <RouterLink :to="backRoute" class="mobile-only no-decoration">
            <ButtonComponent
              class="text-color-primary no-bg no-padding"
              icon-pos="start"
              icon="ic_back_grey@3x.png"
          /></RouterLink>
          <h1>{{ isEdit ? "Edit listing" : "Create new listing" }}</h1>
        </div>
        <form @submit="onPost($event)" enctype="multipart/form-data">
          <div>
            <InputComponent
              title="Street name*"
              placeholder="Enter the street name"
              v-model="housingStore.selectedHouse.location.street"
              required="true"
            />
          </div>
          <div class="flex gap-1/2 flex-wrap">
            <InputComponent
              class="flex-grow"
              title="House number*"
              placeholder="Enter the house number"
              v-model="housingStore.selectedHouse.location.houseNumber"
              type="number"
              required="true"
              min="1"
            />
            <InputComponent
              class="flex-grow"
              title="Addition (optional)"
              placeholder="e.g. A"
              v-model="housingStore.selectedHouse.location.houseNumberAddition"
            />
          </div>
          <div>
            <InputComponent
              title="Postal code*"
              placeholder="e.g. 1000 AA"
              v-model="housingStore.selectedHouse.location.zip"
              required="true"
            />
          </div>
          <div>
            <InputComponent
              title="City*"
              placeholder="e.g. Utrecht"
              v-model="housingStore.selectedHouse.location.city"
              required="true"
            />
          </div>
          <div class="my-1">
            <ImageDropzoneComponent
              title="Upload picture (PNG or JPG)*"
              v-model="housingStore.selectedHouse.image"
              required="true"
            />
            <input
              :value="housingStore.selectedHouse.image"
              class="v-hidden"
              id="test"
              type="file"
              accept="image/png, image/jpeg"
              required
            />
          </div>
          <div>
            <InputComponent
              title="Price*"
              placeholder="e.g. €150.000"
              v-model="housingStore.selectedHouse.price"
              type="number"
              prefix="€"
              required="true"
              min="1"
            />
          </div>
          <div class="flex flex-wrap gap-1">
            <InputComponent
              class="flex-grow w-0"
              title="Size*"
              placeholder="e.g. 60m2"
              type="number"
              v-model="housingStore.selectedHouse.size"
              suffix="m2"
              required="true"
              min="1"
            />
            <DropdownComponent
              class="flex-grow w-0"
              title="Garage*"
              placeholder="Select"
              :options="garageOptions"
              v-model="housingStore.selectedHouse.garage"
              required="true"
            />
          </div>
          <div class="flex flex-wrap gap-1/2">
            <InputComponent
              class="flex-grow w-0"
              title="Bedrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bedrooms"
              required="true"
              min="1"
            />
            <InputComponent
              class="flex-grow w-0"
              title="Bathrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bathrooms"
              required="true"
              min="1"
            />
          </div>
          <div>
            <InputComponent
              title="Construction year*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.constructionYear"
              type="number"
              min="1901"
              :max="new Date().getFullYear()"
              required="true"
            />
          </div>
          <div>
            <TextAreaComponent
              title="Description*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.description"
              required="true"
            />
          </div>
          <div class="flex align-items-center gap-1 mt-1">
            <div class="flex-grow w-full">
              <span v-for="error in validationErrors" class="error-message">
                {{ error }}
              </span>
            </div>
            <ButtonComponent
              class="w-full flex-grow text-color-white element-color-primary"
              :label="isEdit ? 'SAVE' : 'POST'"
              type="submit"
            />
          </div>
        </form>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import InputComponent from "@/components/ui/InputComponent.vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import DropdownComponent from "@/components/ui/DropdownComponent.vue";
import TextAreaComponent from "@/components/ui/TextAreaComponent.vue";
import ImageDropzoneComponent from "@/components/ui/ImageDropzoneComponent.vue";
import { useHousingStore } from "@/stores/housingStore";
import MainLayout from "@/layouts/MainLayout.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const housingStore = useHousingStore();

let route = useRoute();
let isEdit = !!route.params.id;
let backRoute = isEdit ? `/houses/${route.params.id}` : "/houses";
let validationErrors = ref([]);

if (isEdit && !housingStore.selectedHouse.id) {
  housingStore.fetchHouseById(route.params.id);
}

const garageOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const onPost = (event) => {
  event.preventDefault();
  console.log("post", event);
  // if (isEdit) {
  //   housingStore.updateHouse(route.params.id);
  // } else {
  //   housingStore.createHouse();
  // }
};
</script>

<style scoped>
.listing-creation {
  max-width: 30rem;
}
@media (max-width: 768px) {
  .listing-creation {
    max-width: 100%;
  }
  .w-0 {
    width: 100%;
  }
}
</style>
