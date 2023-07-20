<template>
  <div class="flex-column gap-1/4">
    <div class="input-field-title">
      {{ props.title }}
    </div>
    <select
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      :name="props.title"
      :value="input"
      @input="input = $event.target.value"
    >
      <option
        v-for="option in props.options"
        :value="option.value"
        :label="option.label"
      />
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["title", "placeholder", "options", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
