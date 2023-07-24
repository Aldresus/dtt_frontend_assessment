<template>
  <div class="flex-column gap-1/4">
    <label :for="id" class="input-field-title">
      {{ props.title }}
    </label>
    <!--        Input title        -->

    <select
      :id="id"
      class="input-field element-color-tertiary-1 no-drag rounded no-border input-field-text"
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
    <!--        input        -->
  </div>
  <!--        input container        -->
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Choose a value",
  },
  options: {
    type: Array,
    required: true,
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

//generate a unique id for the input by its title
const id = props.title.replace(new RegExp(" ", "g"), "-");
</script>

<style scoped></style>
