<template>
  <div class="card rounded bg-2 flex gap-1">
    <div class="image-container rounded flex justify-content-center">
      <img
        class="no-drag contained-image"
        :src="props.house.image"
        alt="house image"
      />
    </div>
    <div class="house-details flex-column justify-content-between">
      <h2 :class="{ tabs: props.small }">
        {{
          `${props.house.location.houseNumber} ${props.house.location.street}`
        }}
      </h2>
      <div class="text-color-secondary">
        {{ `€ ${props.house.price}` }}
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
  },
  small: {
    required: false,
    type: Boolean,
    default: false,
  },
});
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
