<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">
      {{ props.title }}
    </label>
    <select
      :id="id"
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      :name="props.title"
      :value="input"
      @input="input = $event.target.value"
      :required="props.required"
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

const props = defineProps([
  "title",
  "placeholder",
  "options",
  "modelValue",
  "required",
]);
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const id = props.title.replace(new RegExp(" ", "g"), "-");
</script>

<style scoped></style>
