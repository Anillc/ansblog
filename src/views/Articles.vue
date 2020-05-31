<template>
  <div v-if="articles">
    <div class="atitle">
      <h1>文章列表</h1>
    </div>
    <a-article-card
      v-for="(a,i) in articles"
      :key="i"
      :title="a.title"
      :url="`/article/${a.id}`"
      class="card"
      @click.native="cardClick(a)"
    >
      <p v-html="a.preview" />
    </a-article-card>
    <div class="paging">
      <a-paging :num="pages" :at.sync="pagingAt" />
    </div>
  </div>
</template>

<script>
import AArticleCard from "@/components/AArticleCard.vue";
import APaging from "@/components/APaging.vue";
import NProgress from "nprogress";
import * as apis from "@/apis";

export default {
  name: "articles",
  components: {
    AArticleCard,
    APaging
  },
  data() {
    return {
      pages: 0,
      articles: null
    };
  },
  computed: {
    pagingAt: {
      get() {
        return this.$store.state.selectedPage;
      },
      set(newVal) {
        this.$store.commit("pageSelect", newVal);
        this.page(this.pagingAt);
      }
    }
  },
  mounted() {
    this.load(this.pagingAt);
  },
  methods: {
    async page(num) {
      await this.load(num);

      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    async load(num) {
      NProgress.start();
      try {
        this.pages = await apis.getArticleCount(5);
        this.articles = await apis.getArticlesAt(num - 1, 5);
      } finally {
        NProgress.done();
      }
    },
    cardClick(a) {
      this.$router.push(`/article/${a.id}`);
    }
  }
};
</script>

<style scoped>
.atitle {
  width: 75%;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
  color: #16a085;
}
.card {
  margin: 0 auto;
  margin-bottom: 50px;
}
.paging {
  text-align: center;
  margin-bottom: 10px;
}
</style>