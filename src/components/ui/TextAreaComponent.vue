<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">{{ props.title }}</label>
    <textarea
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      rows="5"
      :placeholder="props.placeholder"
      :value="input"
      @input="input = $event.target.value"
      :required="props.required"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["title", "placeholder", "modelValue", "required"]);

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const id = props.title.replace(new RegExp(" ", "g"), "-");
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
