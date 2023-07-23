<template>
  <div class="button-group flex justify-content-end">
    <button
      class="button-padding flex-grow button-behavior tabs text-color-white left-button no-border text"
      :value="props.options[0].value"
      :class="[
        props.modelValue === props.options[0].value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="$emit('update:modelValue', props.options[0].value)"
    >
      {{ props.options[0].label }}
    </button>

    <button
      v-for="(option, index) in props.options.slice(
        1,
        props.options.length - 1
      )"
      :key="index"
      class="button-padding button-behavior tabs flex-grow text-color-white middle-button no-border text"
      :value="option.value"
      :class="[
        props.modelValue === option.value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>

    <button
      class="button-padding button-behavior tabs flex-grow text-color-white right-button no-border"
      :value="props.options[props.options.length - 1].value"
      :class="[
        props.modelValue === props.options[props.options.length - 1].value
          ? 'element-color-primary'
          : 'element-color-tertiary-2',
      ]"
      @click="
        $emit(
          'update:modelValue',
          props.options[props.options.length - 1].value
        )
      "
    >
      {{ props.options[props.options.length - 1].label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.left-button {
  border-radius: 8px 0 0 8px;
}
.right-button {
  border-radius: 0 8px 8px 0;
}
.middle-button {
  border-radius: 0;
}

@media (max-width: 768px) {
  .button-group {
    width: 100%;
  }
}
</style>
