<template>
  <div
    class="flex search-container rounded align-items-center element-color-tertiary-1 no-drag"
  >
    <img
      src="@/assets/icons/ic_search@3x.png"
      alt="search icon"
      class="search-icon"
    />

    <input
      class="no-border input-field"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="input = $event.target.value"
    />
    <button
      v-if="input"
      class="button-behavior flex align-items-center"
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
.search-container {
  padding: 0 1rem;
  width: 20rem;
}
.search-container:focus-within {
  border: 1px solid;
}

input {
  padding: 10px;
  width: 100%;
  background: none;
}
input:focus {
  outline: none;
}

button {
  background: none;
  border: none;
}
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
