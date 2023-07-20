<script setup>
import HeaderComponent from "@/components/ui/HeaderComponent.vue";
</script>

<template>
  <header class="header-position">
    <HeaderComponent />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.header-position {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

main {
  padding-top: 100px;
  padding-left: 15rem;
  padding-right: 15rem;
}

@media (max-width: 768px) {
  .header-position {
    position: fixed;
    top: unset;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
  main {
    padding-top: 20px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
