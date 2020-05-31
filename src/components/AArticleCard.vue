<template>
  <div class="card">
    <h3 class="title"><router-link :to="url">{{ title }}</router-link></h3>
    <br />
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: "a-article-card",
  props: {
    title: String,
    url: String
  }
};
</script>

<style scoped>
.card {
  width: 65%;
  min-height: 150px;
  padding: 25px;
  box-sizing: border-box;
  background-color: #fafafa;
  box-shadow: 0 1px 2px #cccccc;
  word-wrap: break-word;
  color: #16a085;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>