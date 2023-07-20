<template>
  <div
    class="flex input-field-container rounded align-items-center element-color-tertiary-1 no-drag"
  >
    <img
      src="@/assets/icons/ic_search@3x.png"
      alt="search icon"
      class="search-icon"
    />

    <input
      class="search no-border w-full input-field no-bg input-field-text"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="input = $event.target.value"
    />
    <button
      v-if="input"
      class="button-behavior no-bg no-border flex align-items-center"
      @click="input = ''"
    >
      <img
        src="@/assets/icons/ic_clear@3x.png"
        alt="search icon"
        class="clear-icon"
      />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

let props = defineProps(["placeholder", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped>
.search-icon {
  height: 20px;
  padding: 1px 6px; /* mimic the padding of a button*/
}

.clear-icon {
  vertical-align: center;
  height: 20px;
  width: 20px;
}
</style>
