<template>
  <div class="app">
    <a-aside :show.sync="show" :src="require('@/assets/avatar.jpg')">
      <router-link to="/">
        <a-aside-item>home</a-aside-item>
      </router-link>
      <router-link to="/articles">
        <a-aside-item>blog</a-aside-item>
      </router-link>
      <a href="http://awsl.ee">
        <a-aside-item>最喜欢我家鹿乃啦XD</a-aside-item>
      </a>
      <a href="http://one.ans.ee">
        <a-aside-item>An的oneindex</a-aside-item>
      </a>
      <br />
      <a-aside-item style="color: #666666">友链:</a-aside-item>
      <a href="http://lonay.me">
        <a-aside-item>Lonay</a-aside-item>
      </a>
    </a-aside>
    <a-nav :shadow="shadow">
      <a-nav-item @click.native="show = !show">
        <i class="material-icons">reorder</i>
      </a-nav-item>
      <router-link to="/">
        <a-nav-item>An's blog</a-nav-item>
      </router-link>
    </a-nav>
    <div class="main">
      <router-view />
    </div>
    <a-music class="music" />
  </div>
</template>

<script>
import AAside from "@/components/AAside.vue";
import AAsideItem from "@/components/AAsideItem.vue";
import ANav from "@/components/ANav.vue";
import ANavItem from "@/components/ANavItem.vue";
import AMusic from "@/components/AMusic.vue";

export default {
  name: "app",
  mounted() {
    document.addEventListener("scroll", () => {
      if (window.scrollY >= 40 && !this.shadow) {
        this.shadow = true;
      } else if (window.scrollY < 40 && this.shadow) {
        this.shadow = false;
      }
    });
  },
  components: {
    AAside,
    AAsideItem,
    ANav,
    ANavItem,
    AMusic
  },
  data() {
    return {
      show: false,
      shadow: false
    };
  },
  watch: {
    $route() {
      if (this.show) {
        this.show = false;
      }
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background-color: #ecf0f1;
}

body {
  height: calc(100% - 40px);
}

* {
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  margin-top: 40px;
}
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
.music {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9998;
}
</style>