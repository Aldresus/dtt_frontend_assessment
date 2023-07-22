<template>
  <button
    class="button-behavior button-padding button-icon no-border rounded flex align-items-center justify-content-center"
    @click="$emit('clicked', $event)"
    :type="props.type"
  >
    <span v-if="props.label && (props.iconPos === 'end' || !props.icon)">
      {{ props.label }}</span
    >
    <img
      class="no-drag"
      v-if="props.icon"
      :src="getImageUrl()"
      alt="button icon"
    />
    <span v-if="props.label && props.iconPos === 'start' && props.icon">
      {{ props.label }}</span
    >
  </button>
</template>

<script setup>
const props = defineProps(["label", "icon", "iconPos", "type"]);

const emit = defineEmits(["clicked"]);
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
