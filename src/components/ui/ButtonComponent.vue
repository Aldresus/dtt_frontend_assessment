<template>
  <button
    class="button-behavior button-padding button-icon no-border element-color-primary rounded flex"
  >
    <img
      class="no-drag"
      v-if="props.icon"
      :src="getImageUrl()"
      alt="button icon"
      @click="props.onClick"
    />
    <span class="text-color-white"> {{ props.label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  onClick: {
    type: Function,
    required: true,
  },
});

function getImageUrl() {
  // This path must be correct for your file
  let url = new URL(`@/assets/icons/`, import.meta.url);
  return `${url}/${props.icon}`;
}
</script>

<style scoped>
button img {
  height: 20px;
  width: auto;
}
</style>
