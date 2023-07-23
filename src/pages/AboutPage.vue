<template>
  <MainLayout>
    <div class="flex-column gap-1">
      <div class="mb-3">
        <h1 class="mb-1">About DTT Real Estate</h1>
        <div class="text-color-secondary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            placerat, sapien at tincidunt pharetra, eros lacus tempus dolor,
            eget pharetra ex purus non lorem. Vivamus volutpat semper nulla, vel
            semper nulla dapibus et. Phasellus eleifend mauris id nisi tempor
            consequat. Sed non urna mauris. Maecenas accumsan nec orci sit amet
            pharetra. Praesent tristique diam aliquet porttitor euismod. Vivamus
            suscipit maximus quam, quis feugiat felis varius sit amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            placerat, sapien at tincidunt pharetra, eros lacus tempus dolor,
            eget pharetra ex purus non lorem. Vivamus volutpat semper nulla, vel
            semper nulla dapibus et. Phasellus eleifend mauris id nisi tempor
            consequat. Sed non urna mauris. Maecenas accumsan nec orci sit amet
            pharetra. Praesent tristique diam aliquet porttitor euismod. Vivamus
            suscipit maximus quam, quis feugiat felis varius sit amet.
          </p>
        </div>
      </div>
      <div class="flex-column gap-1">
        <h1 class="mb-1">Design and Development</h1>
        <div class="flex align-items-center gap-2">
          <img
            class="dtt-logo"
            src="@/assets/icons/img_logo_dtt@3x.png"
            alt="DTT logo"
          />
          <div>
            <div>By DTT</div>
            <a href="https://www.d-tt.nl">www.d-tt.nl</a>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<style scoped>
.dtt-logo {
  height: 4rem;
}
</style>
