<template>
  <div class="main">
    <div class="markdown-body" v-html="mark"></div>
    <div
      class="date"
      v-if="time"
    >{{ time.getFullYear() }} 年 {{ time.getMonth() + 1 }} 月 {{ time.getDate() }} 日</div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import marked from "marked";
import hl from "highlight.js";
import * as apis from "@/apis";
import "github-markdown-css/github-markdown.css";

export default {
  name: "a-article",
  data() {
    return {
      mark: "",
      time: null
    };
  },
  async mounted() {
    NProgress.start();
    let id = this.$route.params.id;
    try {
      let article = await apis.getArticle(id);
      this.time = new Date(article.time);
      this.mark = this.md("# " + article.title + "  \n" + article.content);
    } catch (e) {
      this.mark = this.md("# 加载失败  \n" + e);
    } finally {
      NProgress.done();
    }
  },
  methods: {
    md(text) {
      return marked(text, {
        highlight(code) {
          return hl.highlightAuto(code).value;
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 70%;
  height: auto;
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
}

.main::after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

.date {
  color: #7f8c8d;
  font-size: 13px;
  float: right;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
  .main {
    width: 80%;
  }
  .date {
    padding: 15px;
  }
}
</style>