<template>
  <div class="flex-column gap-1/4">
    <div v-if="input" class="pseudo-relative">
      <ButtonComponent
        class="clear-button no-bg icon-shadow"
        icon="ic_clear_white@3x.png"
        @clicked="clear"
        type="button"
      />
    </div>
    <label :for="id" class="input-field-title">
      {{ props.title }}
    </label>
    <label
      :for="id"
      class="dropzone text-color-tertiary rounded flex justify-content-center align-items-center"
      :class="{ 'input-field-invalid': !valid }"
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
      :name="props.name"
    />
  </div>
  <div v-if="props.required && !valid" class="error-message text-color-primary">
    You must upload an image
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";

const props = defineProps({
  title: {
    type: String,
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
  name: {
    type: String,
    required: false,
    default: "image",
  },
  valid: {
    type: Boolean,
    required: false,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const imagePreview = ref(input.value);
watch(input, (value) => {
  imagePreview.value = value;
});

const upload = (event) => {
  //when the user uploads an image, read it and set the imagePreview to the base64 string
  const image = event.target.files[0];
  const reader = new FileReader();

  input.value = image; //for the API, we keep the image as a file

  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
};

const clear = (event) => {
  //clear the input and the imagePreview
  event.preventDefault();
  input.value = null;
  imagePreview.value = "";
};

//generate a unique id for the input by its title
const id = props.title.replace(new RegExp(" ", "g"), "-");
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
