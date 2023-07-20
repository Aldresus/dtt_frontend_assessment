<template>
  <div class="button-group">
    <button
      class="button-padding button-behavior tabs text-color-white left-button no-border text"
      :value="props.options[0].value"
      :class="[
        props.modelValue === props.options[0].value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="setActive(props.options[0].value)"
    >
      {{ props.options[0].label }}
    </button>

    <button
      v-for="(option, index) in props.options.slice(
        1,
        props.options.length - 1
      )"
      :key="index"
      class="button-padding button-behavior tabs text-color-white middle-button no-border text"
      :value="option.value"
      :class="[
        props.modelValue === option.value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="setActive(option.value)"
    >
      {{ option.label }}
    </button>

    <button
      class="button-padding button-behavior tabs text-color-white right-button no-border"
      :value="props.options[props.options.length - 1].value"
      :class="[
        props.modelValue === props.options[props.options.length - 1].value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="setActive(props.options[props.options.length - 1].value)"
    >
      {{ props.options[props.options.length - 1].label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue", "options"]);
const emit = defineEmits(["update:modelValue"]);
const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const setActive = (value) => {
  active.value = value;
};
</script>

<style scoped>
.left-button {
  border-radius: 8px 0 0 8px;
}
.right-button {
  border-radius: 0 8px 8px 0;
}
.middle-button {
  border-radius: 0;
}
</style>
