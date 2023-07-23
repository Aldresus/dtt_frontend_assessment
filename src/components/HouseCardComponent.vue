<template>
  <ModalComponent
    v-if="props.editable && props.house.madeByMe"
    :showModal="showModal"
  >
    <h2>Modal</h2>
    <p>Are you sure you want to delete this listing?</p>
    <p>This action cannot be undone.</p>
    <div class="flex gap-2">
      <ButtonComponent
        class="element-color-secondary text-color-white"
        label="Go back"
        @click.prevent="showModal = false"
      />
      <ButtonComponent
        class="element-color-primary text-color-white"
        label="Yes, delete"
        @click.prevent="
          emit('deleteHouse', props.house.id);
          showModal = false;
        "
      />
    </div>
  </ModalComponent>
  <div class="card rounded bg-2 flex gap-1">
    <div class="image-container rounded flex justify-content-center">
      <img
        class="no-drag contained-image"
        :src="props.house.image"
        alt="house image"
      />
    </div>
    <div class="house-details flex-column justify-content-between flex-grow">
      <div
        :class="{
          flex: props.house.madeByMe,
          'justify-content-between': props.house.madeByMe,
        }"
      >
        <h2 class="" :class="{ tabs: props.small }">
          {{
            `${props.house.location.houseNumber} ${props.house.location.street}`
          }}
        </h2>
        <div v-if="props.editable && props.house.madeByMe" class="flex gap-1">
          <router-link
            class="flex align-items-center"
            :to="`/houses/edit/${props.house.id}`"
          >
            <ButtonComponent
              class="no-bg no-padding"
              icon-pos="start"
              icon="ic_edit@3x.png"
            ></ButtonComponent
          ></router-link>
          <ButtonComponent
            class="no-bg no-padding"
            icon="ic_delete@3x.png"
            @click.prevent="showModal = true"
          ></ButtonComponent>
        </div>
      </div>
      <div class="listing-info text-color-secondary">
        {{ `€ ${utils.formatPrice(props.house.price)}` }}
      </div>
      <div class="listing-info text-color-tertiary">
        {{ `${props.house.location.zip} ${props.house.location.city}` }}
      </div>
      <div class="flex gap-1 listing-info text-color-secondary">
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_bed@3x.png"
            alt="bed icon"
          />
          <span>{{ props.house.rooms.bedrooms }}</span>
        </div>
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_bath@3x.png"
            alt="bath icon"
          />
          <span>{{ props.house.rooms.bathrooms }}</span>
        </div>
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_size@3x.png"
            alt="size icon"
          />
          <span>{{ `${props.house.size} m2` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { utils } from "@/commons/utils";
import ButtonComponent from "@/components/ui/ButtonComponent.vue";
import ModalComponent from "@/components/ui/modalComponent.vue";
import { ref } from "vue";

const props = defineProps({
  house: {
    rooms: {
      required: true,
      type: Object,
    },
    location: {
      required: true,
      type: Object,
    },
    price: {
      required: true,
      type: Number,
    },
    size: {
      required: true,
      type: Number,
    },
    image: {
      required: true,
      type: String,
    },
    madeByMe: {
      required: true,
      type: Boolean,
    },
  },
  small: {
    required: false,
    type: Boolean,
    default: false,
  },
  editable: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["deleteHouse"]);

let showModal = ref(false);
</script>

<style scoped>
.card {
  width: calc(100% - 2rem);
  padding: 1rem;
}

.image-container {
  max-height: 7rem;
  max-width: 7rem;
  width: 20%;
  height: 20%;
  min-width: 5rem;
  min-height: 5rem;
  aspect-ratio: 1;
}

.contained-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
