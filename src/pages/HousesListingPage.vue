<template>
  <div class="flex-column gap-1">
    <div class="flex justify-content-between">
      <h1>Houses</h1>
      <ButtonComponent
        :label="'CREATE NEW'"
        icon="ic_plus_white@3x.png"
        :onClick="test"
      />
    </div>
    <div class="flex gap-2 justify-content-between">
      <div>
        <SearchBarComponent placeholder="Search for a house" v-model="search" />
      </div>
      <SelectButtonComponent :options="selectOptions" v-model="active" />
    </div>
    <div class="flex-column gap-1 align-items-center">
      <HouseCardComponent />
      <HouseCardComponent />
      <HouseCardComponent />
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import HouseCardComponent from "@/components/HouseCardComponent.vue";
import SelectButtonComponent from "@/components/ui/SelectButtonComponent.vue";
import SearchBarComponent from "@/components/ui/SearchBarComponent.vue";
import { ref, watch } from "vue";

let active = ref(0);
let search = ref("");

watch(active, (value) => {
  console.log("active", value);
});

watch(search, (value) => {
  console.log("search", value);
});

const selectOptions = [
  {
    label: "Price",
    value: 0,
  },
  {
    label: "Size",
    value: 1,
  },
  {
    label: "Bedrooms",
    value: 2,
  },
];

const test = () => {
  console.log("test");
};
</script>

<style scoped></style>
