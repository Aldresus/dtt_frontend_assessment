<template>
  <div
    class="header text-no-decoration bg-2 flex header-gap align-items-center"
  >
    <img
      class="no-drag logo"
      src="@/assets/icons/img_logo_dtt@3x.png"
      alt="DTT logo"
    />
    <router-link class="header-menu" to="/">
      <span class="header-text text-color-primary">Houses</span>
      <img
        class="header-icon header-home-icon"
        src="@/assets/icons/ic_mobile_navigarion_home@3x.png"
        alt="unselected home icon"
      />
    </router-link>
    <router-link class="header-menu" to="/about">
      <span class="header-text text-color-primary">About</span>
      <img
        class="header-icon header-info-icon"
        src="@/assets/icons/ic_mobile_navigarion_info@3x.png"
        alt="unselected home icon"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.header {
  height: 50px;
  padding: 10px 15rem;
}

.header-gap {
  gap: 3rem;
}

.header-icon {
  display: none;
}

.header-text {
  display: inherit;
}

.logo {
  height: 80%;
  width: auto;
}

@media (max-width: 768px) {
  .logo {
    display: none;
  }

  .header {
    justify-content: center;
  }

  .header-gap {
    gap: 45vw;
  }

  .header-text {
    display: none;
  }

  .header-icon {
    display: block;
    height: 30px;
    width: auto;
  }

  .router-link-active .header-home-icon {
    content: url("@/assets/icons/ic_mobile_navigarion_home_active@3x.png");
  }
  .router-link-active .header-info-icon {
    content: url("@/assets/icons/ic_mobile_navigarion_info_active@3x.png");
  }
}
</style>
