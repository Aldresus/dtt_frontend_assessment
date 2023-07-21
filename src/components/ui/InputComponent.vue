<template>
  <div class="flex-column gap-1/4">
    <div class="input-field-title">{{ props.title }}</div>
    <div class="flex flex-grow input-wrapper element-color-tertiary-1 rounded">
      <div
        v-if="props.prefix"
        class="input-field text-color-secondary flex justify-content-center align-items-center"
      >
        {{ props.prefix }}
      </div>
      <input
        class="input-field no-drag no-bg no-border flex-grow"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="input"
        @input="input = $event.target.value"
        :min="props.min"
        :max="props.max"
      />
      <div
        v-if="props.suffix"
        class="input-field text-color-secondary flex justify-content-center align-items-center"
      >
        {{ props.suffix }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps([
  "title",
  "placeholder",
  "type",
  "modelValue",
  "prefix",
  "suffix",
  "min",
  "max",
]);

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
