<template>
  <div
    class="overflow-hidden"
    :class="{ 'background-image overflow-hidden': props.backgroundImage }"
  >
    <div class="content">
      <slot></slot>
    </div>
    <!--        Main content        -->
  </div>
  <!--        Main layout        -->
</template>

<script setup>
const props = defineProps({
  backgroundImage: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
.background-image {
  background-image: url("@/assets/icons/img_background@3x.png");
  background-repeat: no-repeat;
  background-size: 100vw;
  background-position: left 20rem bottom;
}

.content {
  /* header height */
  padding: 100px 15rem 1rem;
}
@media (max-width: 768px) {
  .content {
    padding: 0.5rem 2rem 5.5rem;
  }
  .background-image {
    background-position: center bottom;
  }
}
</style>
