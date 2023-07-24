<template>
  <button
    class="button-behavior button-padding button-icon no-border rounded flex align-items-center justify-content-center"
    @click="$emit('clicked', $event)"
    :type="props.type"
  >
    <span v-if="props.label && (props.iconPos === 'end' || !props.icon)">
      {{ props.label }}</span
    >
    <!--        label with iconPos=>'end'        -->

    <img
      class="no-drag"
      v-if="props.icon"
      :src="getImageUrl()"
      alt="button icon"
    />
    <!--        icon        -->

    <span v-if="props.label && props.iconPos === 'start' && props.icon">
      {{ props.label }}</span
    >
    <!--        label with iconPos=>'start'        -->
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  iconPos: {
    type: String,
    required: false,
    default: "start",
  },
  type: {
    type: String,
    required: false,
    default: "button",
  },
});

const emit = defineEmits(["clicked"]);
function getImageUrl() {
  //get the icon by its name
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
