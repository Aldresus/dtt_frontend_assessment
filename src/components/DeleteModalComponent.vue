<template>
  <ModalComponent :showModal="showModal">
    <h2>Modal</h2>
    <p>Are you sure you want to delete this listing?</p>
    <p>This action cannot be undone.</p>
    <div class="flex gap-2">
      <ButtonComponent
        class="element-color-secondary text-color-white"
        label="Go back"
        @click.prevent="showModal = false"
      />
      <ButtonComponent
        class="element-color-primary text-color-white"
        label="Yes, delete"
        @click.prevent="
          emit('deleteHouse', props.house.id);
          showModal = false;
        "
      />
    </div>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "@/components/ui/modalComponent.vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";

import { defineProps } from "vue";

const props = defineProps({
  houseId: {
    type: String,
    required: true,
  },
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["deleteHouse"]);
</script>

<style scoped></style>
