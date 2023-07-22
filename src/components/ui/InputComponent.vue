<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">{{ props.title }}</label>
    <div class="flex flex-grow input-wrapper rounded element-color-tertiary-1">
      <div
        v-if="props.prefix"
        class="input-field text-color-secondary flex justify-content-center align-items-center"
      >
        {{ props.prefix }}
      </div>
      <input
        :id="id"
        class="input-field no-drag no-bg no-border flex-grow"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="input"
        @input="input = $event.target.value"
        :min="props.min"
        :max="props.max"
        :required="props.required"
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
