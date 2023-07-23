<template>
  <div
    v-if="props.showModal"
    class="modal-background flex align-items-center justify-content-center"
  >
    <div class="bg-1 modal-card rounded">
      <slot>
        <!--       modal body -->
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
}
.modal-card {
  padding: 3rem 1rem;
  width: 33%;
}
</style>
