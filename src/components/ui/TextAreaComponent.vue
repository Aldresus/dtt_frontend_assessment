<template>
  <div class="flex-column gap-1/4">
    <div class="input-field-title">{{ props.title }}</div>
    <textarea
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      rows="5"
      :placeholder="props.placeholder"
      :value="input"
      @input="input = $event.target.value"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["title", "placeholder", "modelValue"]);

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
