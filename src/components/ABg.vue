<template>
  <div ref="awa" class="awa">
    <div ref="hana" class="hana"></div>
    <p ref="title" class="title"></p>
  </div>
</template>

<script>
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer";

export default {
  name: "a-bg",
  props:{
    title: String
  },
  data() {
    return {
      w: null,
      h: null,
      scene: new THREE.Scene(),
      cam: null,
      renderer: new CSS3DRenderer(),
      hana: null,
      hanas: [],
      v: new THREE.Vector3()
    };
  },
  mounted() {
    this.hana = this.$refs.hana;
    this.w = this.$refs.awa.offsetWidth;
    this.h = this.$refs.awa.offsetHeight;
    this.cam = new THREE.PerspectiveCamera(100, this.w / this.h, 1, 5000);
    this.renderer.setSize(this.w, this.h);
    this.cam.position.set(0, 0, 500);
    this.cam.lookAt(new THREE.Vector3(0, 0, 0));
    this.$refs.awa.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.resize, false);
    this.init();
    for (let i = 0; i < 20; i++) {
      this.createHana();
    }
    this.rtitle();
    this.ani();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    ani() {
      requestAnimationFrame(this.ani);
      let j = 0;
      while (j < this.hanas.length) {
        let i = this.hanas[j];
        if (i.obj.position.z >= 600) {
          this.scene.remove(i.obj);
          this.hanas = this.hanas.filter(n => n != i);
          this.createHana();
          j--;
        } else {
          i.obj.position.set(
            i.obj.position.x + i.rx,
            i.obj.position.y + i.ry,
            i.obj.position.z + i.rz
          );
        }
        j++;
      }
      this.renderer.render(this.scene, this.cam);
    },
    createHana() {
      let cloneHana = this.hana.cloneNode();
      cloneHana.style.display = "block";
      let obj = new CSS3DObject(cloneHana);
      obj.position.copy(this.v);
      this.hanas.push({
        obj,
        rx: Math.round(Math.random() * (this.w / 4)) / 10,
        ry: -10,
        rz: (function rand() {
          let r = Math.round(Math.random() * 20);
          return r == 0 ? rand() : r;
        })()
      });
      this.scene.add(obj);
    },
    resize() {
      this.w = this.$refs.awa.offsetWidth;
      this.h = this.$refs.awa.offsetHeight;
      this.cam.aspect = this.w / this.h;
      this.cam.updateProjectionMatrix();
      this.renderer.setSize(this.w, this.h);
      this.init();
    },
    init() {
      let v = new THREE.Vector3();
      v.x = -1.1;
      v.y = 1.1;
      v = new THREE.Vector3(v.x, v.y, 0.5).unproject(this.cam);
      let ray = new THREE.Ray(
        this.cam.position,
        v.sub(this.cam.position).normalize()
      );
      ray.at(600, this.v);
    },
    rtitle() {
      let title = this.$refs.title.cloneNode();
      title.style.display = 'block';
      title.innerText = this.title;
      let t1 = new CSS3DObject(title);
      t1.position.set(0, 20, 350);
      this.scene.add(t1);
    }
  }
};
</script>

<style scoped>
.title {
  color: rgb(20, 20, 20);
  /* color: transparent; */
  font-size: 25px;
  /* background-image: url('../assets/awa.png');
  background-clip: text; */
  display: none;
}
.awa {
  background-color: #fff;
}
.hana {
  width: 20px;
  height: 20px;
  background-color: pink;
  filter: blur(5px);
  display: none;
}
</style>