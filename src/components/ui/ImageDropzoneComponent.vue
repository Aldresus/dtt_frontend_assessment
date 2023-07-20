<template>
  <div class="flex-column gap-1/4">
    <label :for="props.title" class="input-field-title">
      {{ props.title }}
    </label>
    <label
      :for="props.title"
      class="dropzone text-color-tertiary rounded flex justify-content-center align-items-center"
    >
      <img
        v-if="!props.modelValue"
        class="drop-icon no-drag"
        src="@/assets/icons/ic_upload@3x.png"
        alt="upload icon"
      />
      <span v-if="props.modelValue" class="house-preview">
        <img
          class="house-preview no-drag"
          :src="getImageUrl()"
          alt="house preview"
        />
        <ButtonComponent
          class="clear-button no-bg"
          icon="ic_clear_white@3x.png"
          @clicked="clear"
        />
      </span>
    </label>
    <input
      :id="props.title"
      type="file"
      accept="image/png, image/jpeg"
      @change="input = $event.target.files[0].name"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";

const props = defineProps(["title", "placeholder", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const getImageUrl = () => {
  // This path must be correct for your file
  let url = new URL(`@/assets/exampleHouses/`, import.meta.url);
  return `${url}/${props.modelValue}`;
};

const clear = (event) => {
  event.preventDefault();
  input.value = "";
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.dropzone {
  width: 5vw;
  height: 5vw;
  border: 2px dashed;

  cursor: pointer;
}
.drop-icon {
  height: 20px;
  width: auto;
}

.house-preview {
  height: 100%;
  width: 100%;
}
.clear-button {
  position: relative;
  bottom: 6rem;
  left: 3rem;
}
</style>
