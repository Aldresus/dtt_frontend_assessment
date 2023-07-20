<template>
  <div class="card rounded bg-2 flex gap-1">
    <div class="house-image-container rounded">
      <img class="no-drag house-image" :src="house.image" alt="house image" />
    </div>
    <div class="house-details flex-column justify-content-between">
      <h2>
        {{ `${house.location.houseNumber} ${house.location.street}` }}
      </h2>
      <div class="text-color-secondary">
        {{ `€ ${house.price}` }}
      </div>
      <div class="listing-info text-color-tertiary">
        {{ `${house.location.zip} ${house.location.city}` }}
      </div>
      <div class="flex gap-1 listing-info text-color-secondary">
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_bed@3x.png"
            alt="bed icon"
          />
          <span>{{ house.rooms.bedrooms }}</span>
        </div>
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_bath@3x.png"
            alt="bath icon"
          />
          <span>{{ house.rooms.bathrooms }}</span>
        </div>
        <div>
          <img
            class="house-icon"
            src="@/assets/icons/ic_size@3x.png"
            alt="size icon"
          />
          <span>{{ `${house.size} m2` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//todo props
// const house = defineProps({
//   type: Object,
//   required: true,
// });

const house = {
  id: 2,
  image: "https://api.intern.d-tt.nl/uploads/house1.jpg",
  price: 123,
  rooms: {
    bedrooms: 1,
    bathrooms: 1,
  },
  size: 500,
  description: "oui",
  location: {
    street: "street",
    houseNumber: 20,
    houseNumberAddition: null,
    city: "assas",
    zip: "asasdd",
  },
  createdAt: "2020-05-07",
  constructionYear: 2000,
  hasGarage: false,
  madeByMe: false,
};
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

@media (max-width: 768px) {
}
</style>
