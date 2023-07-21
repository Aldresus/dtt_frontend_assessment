<template>
  <MainLayout :background-image="true">
    <template v-slot>
      <div class="flex-column gap-1/2 listing-creation">
        <RouterLink to="/houses" class="no-decoration">
          <ButtonComponent
            class="text-color-primary desktop-only no-bg no-padding"
            icon-pos="start"
            label="Back to overview"
            icon="ic_back_grey@3x.png"
        /></RouterLink>
        <div class="flex align-items-center justify-content-between mb-1">
          <RouterLink to="/houses" class="mobile-only no-decoration">
            <ButtonComponent
              class="text-color-primary no-bg no-padding"
              icon-pos="start"
              icon="ic_back_grey@3x.png"
          /></RouterLink>
          <h1>Create new listing</h1>
        </div>
        <form>
          <div>
            <InputComponent
              title="Street name*"
              placeholder="Enter the street name"
              v-model="housingStore.selectedHouse.location.street"
            />
          </div>
          <div class="flex gap-1/2 flex-wrap">
            <InputComponent
              class="flex-grow"
              title="House number*"
              placeholder="Enter the house number"
              v-model="housingStore.selectedHouse.location.houseNumber"
              type="number"
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
            />
          </div>
          <div>
            <InputComponent
              title="City*"
              placeholder="e.g. Utrecht"
              v-model="housingStore.selectedHouse.location.city"
            />
          </div>
          <div class="my-1">
            <ImageDropzoneComponent
              title="Upload picture (PNG or JPG)*"
              v-model="housingStore.selectedHouse.image"
            />
          </div>
          <div>
            <InputComponent
              title="Price*"
              placeholder="e.g. €150.000"
              v-model="housingStore.selectedHouse.price"
              type="number"
              prefix="€"
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
            />
            <DropdownComponent
              class="flex-grow w-0"
              title="Garage*"
              placeholder="Select"
              :options="garageOptions"
              v-model="housingStore.selectedHouse.garage"
            />
          </div>
          <div class="flex flex-wrap gap-1/2">
            <InputComponent
              class="flex-grow w-0"
              title="Bedrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bedrooms"
            />
            <InputComponent
              class="flex-grow w-0"
              title="Bathrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bathrooms"
            />
          </div>
          <div>
            <InputComponent
              title="Construction date*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.constructionYear"
              type="date"
              min="1901-01-01"
              :max="new Date().toISOString().split('T')[0]"
            />
          </div>
          <div>
            <TextAreaComponent
              title="Description*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.description"
            />
          </div>
          <div class="flex gap-1 mt-1">
            <div class="flex-grow w-full"></div>
            <ButtonComponent
              class="w-full flex-grow text-color-white element-color-primary"
              label="POST"
              @clicked="onPost"
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
import { storeToRefs } from "pinia";
import MainLayout from "@/layouts/MainLayout.vue";

const housingStore = useHousingStore();

let { selectedHouse } = storeToRefs(housingStore);

const garageOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const onPost = () => {
  console.log(housingStore.selectedHouse);
  housingStore.createHouse();
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
