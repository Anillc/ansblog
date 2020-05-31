<template>
  <div ref="awa" class="awa">
    <div ref="hana" class="hana"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer";

export default {
  name: "a-background",
  data() {
    return {
      scene: new THREE.Scene(),
      cam: null,
      renderer: new CSS3DRenderer(),
      hanas: null
    };
  },
  mounted() {
    let w = this.$refs.awa.offsetWidth;
    let h = this.$refs.awa.offsetHeight;
    this.cam = new THREE.PerspectiveCamera(100, w / h, 1, 5000);
    this.renderer.setSize(w, h);
    this.cam.position.set(0, 0, 500);
    this.cam.lookAt(new THREE.Vector3(0, 0, 0));
    this.$refs.awa.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.resize, false);

    let hana = this.$refs.hana;
    let hs = [];
    for (let i = 0; i < 70; i++) {
      let cloneHana = hana.cloneNode();
      cloneHana.style.display = "block";
      let obj = new CSS3DObject(cloneHana);
      obj.position.set(0, 0, 0);
      hs.push({
        obj,
        rx:
          (Math.pow(-1, Math.round(Math.random() * 10)) *
            Math.round(Math.random() * 100)) /
          10,
        ry:
          (Math.pow(-1, Math.round(Math.random() * 10)) *
            Math.round(Math.random() * 100)) /
          10,
        rz: Math.round(Math.random() * 20)
      });
      this.scene.add(obj);
    }

    this.hanas = hs;

    let title = document.createElement("p");
    title.innerText = "Hello World!";
    title.style.fontSize = "30px";
    let t1 = new CSS3DObject(title);
    t1.position.set(0, 0, 350);
    this.scene.add(t1);

    this.ani();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    ani() {
      requestAnimationFrame(this.ani);
      for (let i of this.hanas) {
        if (
          i.obj.position.x >= 400 ||
          i.obj.position.x <= -400 ||
          i.obj.position.y >= 400 ||
          i.obj.position.y <= -400 ||
          i.obj.position.z >= 600
        ) {
          i.obj.position.set(0, 0, 0);
        }
        i.obj.position.set(
          i.obj.position.x + i.rx,
          i.obj.position.y + i.ry,
          i.obj.position.z + i.rz
        );
      }
      this.renderer.render(this.scene, this.cam);
    },
    resize() {
      console.log(1);
      
      let w = this.$refs.awa.offsetWidth;
      let h = this.$refs.awa.offsetHeight;
      this.cam.aspect = w / h;
      this.cam.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }
};
</script>

<style scoped>
.awa {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 10000;
}
.hana {
  width: 50px;
  height: 50px;
  background-color: pink;
  border-radius: 50%;
  filter: blur(2px);
  display: none;
}
</style>