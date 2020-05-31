<template>
  <ul class="paging">
    <li @click="last">上一页</li>
    <li
      v-for="i in num"
      :key="i"
      @click="select(i)"
      :class="{'paging-selected': i==iat}"
    >{{ i }}</li>
    <li @click="next">下一页</li>
  </ul>
</template>

<script>
export default {
  name: "a-paging",
  props: {
    num: Number,
    at: Number
  },
  data() {
    return {
      iat: this.at
    };
  },
  methods: {
    last() {
      if (this.iat > 1) {
        this.$emit("update:at", --this.iat);
      }
    },
    next() {
      if (this.iat < this.num) {
        this.$emit("update:at", ++this.iat);
      }
    },
    select(i) {
      this.$emit("update:at", (this.iat = i));
    }
  }
};
</script>

<style scoped>
.paging {
  display: inline-block;
  background-color: #fafafa;
  box-shadow: 0 1px 2px #cccccc;
  color: #16a085;
}
.paging li {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: -1px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s;
}

.paging li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.paging-selected {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>