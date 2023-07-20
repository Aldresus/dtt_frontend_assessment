<template>
  <div class="flex-column gap-1/4">
    <div class="input-field-title">{{ props.title }}</div>
    <input
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      :placeholder="props.placeholder"
      :type="props.type"
      :value="input"
      @input="input = $event.target.value"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["title", "placeholder", "type", "modelValue"]);

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
