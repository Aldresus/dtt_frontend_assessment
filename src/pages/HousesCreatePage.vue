<template>
  <div class="flex-column gap-1">
    <RouterLink to="/houses" class="no-decoration">
      <ButtonComponent
        class="text-color-primary no-bg no-padding"
        icon-pos="start"
        label="Back to overview"
        icon="ic_back_grey@3x.png"
    /></RouterLink>
    <h1>Create new listing</h1>
    <div class="flex-column gap-1/2 listing-creation">
      <form>
        <div>
          <InputComponent
            title="Street name*"
            placeholder="Enter the street name"
            v-model="housingStore.selectedHouse.location.street"
          />
        </div>
        <div class="flex gap-1">
          <InputComponent
            class="flex-grow"
            title="House number*"
            placeholder="Enter the house number"
            v-model="housingStore.selectedHouse.location.houseNumber"
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
        <div>
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
          />
        </div>
        <div class="flex gap-1">
          <InputComponent
            class="flex-grow w-full"
            title="Size*"
            placeholder="e.g. 60m2"
            type="number"
            v-model="housingStore.selectedHouse.size"
          />
          <DropdownComponent
            class="flex-grow w-full"
            title="Garage*"
            placeholder="Select"
            :options="garageOptions"
            v-model="housingStore.selectedHouse.garage"
          />
        </div>
        <div class="flex gap-1">
          <InputComponent
            class="flex-grow"
            title="Bedrooms*"
            type="number"
            placeholder="Enter amount"
            v-model="housingStore.selectedHouse.rooms.bedrooms"
          />
          <InputComponent
            class="flex-grow"
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
  </div>
</template>

<script setup>
import InputComponent from "@/components/ui/InputComponent.vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import DropdownComponent from "@/components/ui/DropdownComponent.vue";
import TextAreaComponent from "@/components/ui/TextAreaComponent.vue";
import ImageDropzoneComponent from "@/components/ui/ImageDropzoneComponent.vue";
import { useHousingStore } from "@/stores/housingStore";
import { storeToRefs } from "pinia";

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
  max-width: 30vw;
}
</style>
