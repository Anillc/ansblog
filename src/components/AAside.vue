<template>
  <div class="aside-out" v-show="outshow" @click="outclick($event)">
    <transition name="aside-t" @before-enter="outshow = !outshow" @after-leave="outshow = !outshow">
      <div class="aside" v-show="ishow" ref="aside">
        <div class="avater">
          <img :src="src"/>
        </div>
        <ul class="aside-list">
          <slot />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "a-aside",
  props: {
    src: String,
    show: Boolean
  },
  data() {
    return {
      ishow: this.show,
      outshow: this.show
    };
  },
  watch: {
    show(newVal) {
      this.ishow = newVal;
    }
  },
  methods: {
    outclick(e) {
      if (this.$refs.aside.contains(e.target)) {
        return;
      }
      this.ishow = false;
      this.$emit("update:show", false);
    }
  }
};
</script>

<style scoped>
.aside-out {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
}
.aside {
  position: relative;
  height: 100%;
  width: 200px;
  top: 0;
  left: 0;
  background-color: #95a5a6;
}
.aside-t-enter-active,
.aside-t-leave-active {
  transition: left 0.5s;
}
.aside-t-enter,
.aside-t-leave-to {
  left: -200px;
}
.aside-list {
  margin-top: 20px;
}
.avater {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #bdc3c7;
}
.avater img {
  position: absolute;
  width: 150px;
  height: 150px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 50%;

  transform: rotate(0deg);
  transition: transform 2s;
}

.avater img:hover {
  transform: rotate(360deg);
}
</style>