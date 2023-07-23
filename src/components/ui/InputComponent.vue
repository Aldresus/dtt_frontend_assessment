<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">{{ props.title }}</label>
    <div
      class="flex flex-grow input-wrapper rounded element-color-tertiary-1"
      :class="{ 'input-field-invalid': !valid }"
    >
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
    <div
      v-if="props.required && !valid"
      class="error-message text-color-primary"
    >
      {{ error }}
    </div>
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
  type: {
    type: String,
    required: false,
    default: "text",
  },
  modelValue: {
    required: true,
  },
  prefix: {
    type: String,
    required: false,
  },
  suffix: {
    type: String,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
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

  if (props.type !== "number") {
    valid.value = input.value.length > 0;
    if (!valid.value) {
      error.value = "This field cannot be empty";
    }
  }
  if (props.type === "number") {
    if (props.min && props.max) {
      valid.value = input.value >= props.min && input.value <= props.max;
      if (!valid.value) {
        error.value = `The value must be between ${props.min} and ${props.max}`;
      }
    } else if (props.min) {
      valid.value = input.value >= props.min;
      if (!valid.value) {
        error.value = `The value must be greater than ${props.min}`;
      }
    } else if (props.max) {
      if (!valid.value) {
        error.value = `The value must be less than ${props.max}`;
      }
      valid.value = input.value <= props.max;
    } else {
      valid.value = true;
    }
  }
};

watch(input, validator);

const id = props.title.replace(new RegExp(" ", "g"), "-");
</script>

<style scoped></style>
