<template>
  <div>
    <a-bg title="An's Blog" class="abg" />
  </div>
</template>

<script>
import ABg from "@/components/ABg.vue";

export default {
  name: "home",
  components: {
    ABg
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.abg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>