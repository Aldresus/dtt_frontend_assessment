<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">{{ props.title }}</label>
    <textarea
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
      :class="{ 'input-field-invalid': !valid }"
      rows="5"
      :placeholder="props.placeholder"
      :value="input"
      @input="input = $event.target.value"
      :required="props.required"
    />
  </div>
  <div v-if="props.required && !valid" class="error-message text-color-primary">
    {{ error }}
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Enter your value",
  },
  modelValue: {
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const valid = ref(true);
const error = ref("");
const validator = () => {
  if (!props.required) return;

  valid.value = input.value.length > 0;
  if (!valid.value) {
    error.value = "This field cannot be empty";
  }
};

watch(input, validator);

const id = props.title.replace(new RegExp(" ", "g"), "-");
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
