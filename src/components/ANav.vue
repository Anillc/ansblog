<template>
  <div class="nav" :class="{'nav-shadow':shadow}">
    <ul class="nav-list">
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  name: "a-nav",
  props: {
    shadow: Boolean
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 40px;
  top: 0;
  background-color: white;
  z-index: 999;
  display: flex;
}
.nav-list {
  list-style: none;
  margin-left: 20px;
}
.nav-shadow {
  box-shadow: 0px 1px 0px #cccccc;
}
</style>