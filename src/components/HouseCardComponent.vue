<template>
  <div class="card rounded bg-2 flex gap-1">
    <div class="house-image-container rounded">
      <img
        class="no-drag house-image"
        :src="props.house.image"
        alt="house image"
      />
    </div>
    <div class="house-details flex-column justify-content-between">
      <h2>
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
});
</script>

<style scoped>
.card {
  width: calc(100% - 2rem);
  padding: 1rem;
  height: 15vh;
  min-height: 6rem;
}

.house-image-container {
  height: 100%;
  max-width: 15vh;
  min-width: 6rem;
  overflow: hidden;
}

.house-image {
  height: 100%;
  width: auto;
}
.house-icon {
  height: 0.8rem;
  width: auto;
  margin-right: 0.5rem;
}

.house-details {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
