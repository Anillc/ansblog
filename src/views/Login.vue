<template>
  <div></div>
</template>

<script>
import * as apis from "@/apis";

export default {
  name: "login",
  mounted() {
    window.login = async (u, p) => {
      let user = await apis.login(u, p);
      this.$store.commit("user", user);
      let r = this.$route.query.redirect;
      if (r) {
        this.$router.push(r);
      } else {
        this.$router.push("/");
      }
    };
  },
  beforeDestroy() {
    delete window.login;
  }
};
</script>

<style scoped>
</style>