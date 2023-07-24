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
            type="button"
        /></RouterLink>
        <!--        desktop back button        -->

        <div class="flex align-items-center justify-content-between mb-1">
          <RouterLink :to="backRoute" class="mobile-only no-decoration">
            <ButtonComponent
              class="text-color-primary no-bg no-padding"
              icon-pos="start"
              icon="ic_back_grey@3x.png"
              type="button"
          /></RouterLink>
          <!--        mobile back button        -->
          <h1>{{ isEdit ? "Edit listing" : "Create new listing" }}</h1>
        </div>
        <!--       title and mobile back button        -->

        <form @submit="onPost($event)" enctype="multipart/form-data">
          <div>
            <InputComponent
              title="Street name*"
              placeholder="Enter the street name"
              v-model="housingStore.selectedHouse.location.street"
              :required="true"
            />
          </div>
          <!--        street name input       -->

          <div class="flex gap-1/2 flex-wrap">
            <InputComponent
              class="flex-grow"
              title="House number*"
              placeholder="Enter the house number"
              v-model="housingStore.selectedHouse.location.houseNumber"
              type="number"
              :required="true"
              :min="1"
            />
            <!--        house number input       -->
            <InputComponent
              class="flex-grow"
              title="Addition (optional)"
              placeholder="e.g. A"
              v-model="housingStore.selectedHouse.location.houseNumberAddition"
            />
            <!--        house number addition input       -->
          </div>
          <!--        inline house number and addition input container       -->

          <div>
            <InputComponent
              title="Postal code*"
              placeholder="e.g. 1000 AA"
              v-model="housingStore.selectedHouse.location.zip"
              :required="true"
            />
          </div>
          <!--        postal code input       -->

          <div>
            <InputComponent
              title="City*"
              placeholder="e.g. Utrecht"
              v-model="housingStore.selectedHouse.location.city"
              :required="true"
            />
          </div>
          <!--        city input       -->

          <div class="my-1">
            <ImageDropzoneComponent
              title="Upload picture (PNG or JPG)*"
              v-model="housingStore.selectedHouse.image"
              :valid="isImageValid"
              :required="true"
            />
          </div>
          <!--        image dropzone       -->

          <div>
            <InputComponent
              title="Price*"
              placeholder="e.g. €150.000"
              v-model="housingStore.selectedHouse.price"
              type="number"
              prefix="€"
              :required="true"
              :min="1"
            />
          </div>
          <!--        price input       -->

          <div class="flex flex-wrap gap-1">
            <InputComponent
              class="flex-grow w-0"
              title="Size*"
              placeholder="e.g. 60m2"
              type="number"
              v-model="housingStore.selectedHouse.size"
              suffix="m2"
              :required="true"
              :min="1"
            />
            <!--        size input       -->

            <DropdownComponent
              class="flex-grow w-0"
              title="Garage*"
              placeholder="Select"
              :options="garageOptions"
              v-model="housingStore.selectedHouse.hasGarage"
              :required="true"
            />
            <!--        garage dropdown       -->
          </div>
          <!--        inline size and garage dropdown container       -->

          <div class="flex flex-wrap gap-1/2">
            <InputComponent
              class="flex-grow w-0"
              title="Bedrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bedrooms"
              :required="true"
              :min="1"
            />
            <!--        bedrooms input       -->

            <InputComponent
              class="flex-grow w-0"
              title="Bathrooms*"
              type="number"
              placeholder="Enter amount"
              v-model="housingStore.selectedHouse.rooms.bathrooms"
              :required="true"
              :min="1"
            />
            <!--        bathrooms input       -->
          </div>
          <!--        inline bedrooms and bathrooms input container       -->

          <div>
            <InputComponent
              title="Construction year*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.constructionYear"
              type="number"
              :min="1901"
              :max="new Date().getFullYear()"
              :required="true"
            />
          </div>
          <!--        construction year input       -->

          <div>
            <TextAreaComponent
              title="Description*"
              placeholder="Enter description"
              v-model="housingStore.selectedHouse.description"
              :required="true"
            />
          </div>
          <!--        description input       -->

          <div class="flex align-items-center gap-1 mt-1">
            <div class="flex-grow w-full"></div>
            <!--        spacer        -->

            <ButtonComponent
              class="w-full flex-grow text-color-white element-color-primary"
              :label="isUploading ? '' : isEdit ? 'SAVE' : 'POST'"
              :class="{ loading: isUploading }"
              type="submit"
            />
          </div>
          <!--        submit button       -->
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
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const housingStore = useHousingStore();
let route = useRoute();
let router = useRouter();

let isEdit = route.name === "HousesEditPage";
let isUploading = ref(false);
let backRoute = isEdit ? `/houses/${route.params.id}` : "/houses";

//image upload input is different from the others, so we need to check it separately
// when creating, the image is from a File which the user uploads by the input
// when editing an existing house, the image is an url string which breaks the input and therefore the default html validation
// I did not find a way to make the input work with both types, so I decided to disable the html validation and do it manually
let isImageValid = ref(true);

if (isEdit) {
  housingStore.fetchHouseById(route.params.id);
} else if (!isEdit) {
  housingStore.resetSelectedHouse();
}

const garageOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const onPost = (event) => {
  event.preventDefault();

  if (!housingStore.selectedHouse.image) {
    //validate the image dropzone manually
    isImageValid.value = false;
    return;
  } else {
    isImageValid.value = true;
  }

  isUploading.value = true; //show loading button
  if (isEdit) {
    housingStore.updateHouse(route.params.id).then((id) => {
      if (id) {
        isUploading.value = false;
        router.push(`/houses/${id}`);
      }
    });
  } else {
    housingStore.createHouse().then((id) => {
      isUploading.value = false;
      if (id) {
        router.push(`/houses/${id}`);
      }
    });
  }
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
