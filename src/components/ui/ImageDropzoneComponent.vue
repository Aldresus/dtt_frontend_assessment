<template>
  <div class="flex-column gap-1/4">
    <div class="pseudo-relative">
      <ButtonComponent
        class="clear-button no-bg icon-shadow"
        icon="ic_clear_white@3x.png"
        @clicked="clear"
      />
    </div>
    <label :for="id" class="input-field-title">
      {{ props.title }}
    </label>
    <label
      :for="id"
      class="dropzone text-color-tertiary rounded flex justify-content-center align-items-center"
    >
      <img
        v-if="!props.modelValue"
        class="drop-icon no-drag"
        src="@/assets/icons/ic_upload@3x.png"
        alt="upload icon"
      />
      <span
        v-if="props.modelValue"
        class="flex justify-content-center image-container rounded"
      >
        <img
          class="contained-image no-drag"
          :src="imagePreview"
          alt="house preview"
        />
      </span>
    </label>

    <input
      :id="id"
      type="file"
      accept="image/png, image/jpeg"
      @change="upload($event)"
      :required="props.required"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";

const props = defineProps(["title", "placeholder", "modelValue", "required"]);
const emit = defineEmits(["update:modelValue"]);

const imagePreview = ref("");
const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const id = props.title.replace(new RegExp(" ", "g"), "-");

watch(
  () => props.modelValue,
  () => {
    console.log("props.modelValue", props.modelValue, input);
    if (input) {
      console.log("props.modelValue", props.modelValue, input);

      imagePreview.value = input.value;
    }
  }
);

const upload = (event) => {
  const image = event.target.files[0];
  const reader = new FileReader();
  input.value = image;
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
};

const clear = (event) => {
  event.preventDefault();
  input.value = null;
  imagePreview.value = "";
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.dropzone {
  width: 5rem;
  height: 5rem;
  border: 2px dashed;

  cursor: pointer;
}
.drop-icon {
  height: 20px;
  width: auto;
}

.clear-button {
  position: absolute;
  left: 3.5rem;
  top: 0.5rem;
}
</style>
