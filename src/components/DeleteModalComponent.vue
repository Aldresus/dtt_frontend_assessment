<template>
  <ModalComponent :showModal="showModal">
    <div class="flex-column justify-content-center align-items-center gap-1">
      <h2>Modal</h2>
      <div class="flex-column align-items-center">
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div class="flex gap-2">
        <ButtonComponent
          class="element-color-secondary text-color-white"
          label="Go back"
          @click.prevent="$emit('closeModal')"
        />
        <!--        button to close the modal        -->

        <ButtonComponent
          class="element-color-primary text-color-white"
          label="Yes, delete"
          @click.prevent="$emit('deleteHouse', props.houseId)"
        />
        <!--        button to delete the house        -->
      </div>
      <!--        buttons container        -->
    </div>
    <!--        modal body        -->
  </ModalComponent>
  <!--        modal        -->
</template>

<script setup>
import ModalComponent from "@/components/ui/modalComponent.vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";

import { defineProps } from "vue";

const props = defineProps({
  houseId: {
    type: Number,
    required: true,
  },
  showModal: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["deleteHouse", "closeModal"]);
</script>

<style scoped></style>
