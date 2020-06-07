<template>
  <div style="height: 100%">
    <div class="editor">
      <i class="material-icons loading" v-if="uploading">cached</i>
      <div class="tool-bar">
        <input type="text" class="title" v-model="title" placeholder="title" />
        <div class="upbtn" @click="upArticle">上传</div>
      </div>
      <div ref="editor" class="monaco"></div>
    </div>
    <div class="view markdown-body" v-html="view" ref="preview"></div>
    <input
      type="file"
      @change="upImgChanged($event)"
      accept="image/*"
      ref="upimg"
      style="display: none"
    />
  </div>
</template>

<script>
import NProgress from "nprogress";
import marked from "marked";
import * as monaco from "monaco-editor";
import * as apis from "@/apis";
import "github-markdown-css/github-markdown.css";

export default {
  name: "md-editor",
  data() {
    return {
      editor: null,
      title: "",
      article: null,
      view: "",
      uploading: false
    };
  },
  async mounted() {
    NProgress.start();
    try {
      await this.loadArticle();
      this.editor = monaco.editor.create(this.$refs.editor, {
        value: this.article.content,
        language: "markdown"
      });
      this.editor.addAction({
        id: "upimg",
        label: "Upload Image",
        contextMenuGroupId: "action",
        contextMenuOrder: 1,
        run: this.upImg
      });
      this.editor.addAction({
        id: "upbmob",
        label: "Upload Article to Bmob",
        contextMenuGroupId: "action",
        contextMenuOrder: 2,
        run: this.upArticle
      });
      window.addEventListener("resize", this.resize);
      let f = () => {
        this.view = marked(this.editor.getValue());
      };
      this.editor.onKeyUp(f);
      f();
    } catch (e) {
      this.$refs.editor.innerText = e;
    } finally {
      NProgress.done();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.editor.layout();
    },
    async loadArticle() {
      let id = this.$route.params.id;
      if (!id) {
        this.article = { id: "", title: "", content: "", time: 0 };
        return;
      }
      let res = await apis.getArticle(id);
      this.title = res.title;
      this.article = res;
    },
    upImg() {
      this.$refs.upimg.click();
    },
    async upImgChanged(e) {
      try {
        let url = await apis.uploadImg(
          this.$store.state.user,
          e.target.files[0]
        );
        this.insertText(url);
      } catch (e) {
        alert(e);
      }
    },
    async upArticle() {
      if (this.uploading) {
        return;
      }
      this.uploading = true;
      try {
        let id;
        if (this.article.objectId) {
          id = this.article.id;
          await apis.updateArticle(
            this.$store.state.user,
            this.article.objectId,
            this.article.id,
            this.title,
            this.editor.getValue(),
            this.$refs.preview.innerText,
            new Date().getTime()
          );
        } else {
          id = prompt("输入文章id").trim();
          if (id === ""){
            return;
          }
          await apis.uploadArticle(
            this.$store.state.user,
            id,
            this.title,
            this.editor.getValue(),
            this.$refs.preview.innerText,
            new Date().getTime()
          );
        }
        this.$router.push("/article/" + id);
      } catch (e) {
        alert("上传失败:" + e);
      }
      this.uploading = false;
    },
    insertText(text) {
      let position = this.editor.getPosition();
      this.editor.executeEdits("", [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          },
          text: text
        }
      ]);
    }
  }
};
</script>

<style scoped>
.editor,
.view {
  height: 100%;
  width: 50%;
  float: left;
}

.loading {
  position: absolute;
  right: 15px;
  height: 40px;
  line-height: 40px;
  animation: loading 0.5s infinite linear;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.editor {
  position: relative;
}

.view {
  background-color: #ffffff;
  overflow: auto;
}

.tool-bar {
  height: 40px;
}

.title {
  height: 40px;
  width: calc(100% - 100px);
  outline-style: none;
  box-sizing: border-box;
  border: 0.5px solid rgb(238, 238, 238);
  padding-left: 15px;
  font-size: 15px;
  float: left;
}

.upbtn {
  background-color: #ffffff;
  color: #757575;
  cursor: pointer;
  transition: background-color 0.5s;
  line-height: 40px;
  text-align: center;
  height: 40px;
  width: 100px;
  float: left;
}

.upbtn:hover {
  background-color: #dddddd;
}

.monaco {
  height: calc(100% - 40px);
  width: 100%;
  box-sizing: border-box;
  border: 0.5px solid rgb(238, 238, 238);
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
  .editor,
  .view {
    width: 100%;
  }
}
</style>