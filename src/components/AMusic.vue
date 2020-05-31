<template>
  <div class="player-main">
    <div class="list-out">
      <div class="play-list" :class="{'play-list-show':showlist}">
        <ul>
          <li
            v-for="(n,i) in list"
            :key="i"
            :class="{'playing':i==now}"
            @click="itemSelected(i)"
          >{{ i+1 }}. {{ n }}</li>
        </ul>
      </div>
    </div>
    <div class="player">
      <i class="material-icons" @click="play">{{ playing ? "pause" : "play_arrow" }}</i>
      <i class="material-icons" @click="next">skip_next</i>
      <i class="material-icons" @click="slist">queue_music</i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const LINK_PRE = "https://static-awsl.makjust.com/music/";

export default {
  name: "a-music",
  data() {
    return {
      au: new Audio(),
      playing: false,
      now: 0,
      list: [],
      showlist: false
    };
  },
  async mounted() {
    window.au = this.au;
    let d = (await axios.get("https://static-awsl.makjust.com/list.txt")).data;
    this.list = d.split("\n").filter(n => !n.endsWith(".ncm"));
    this.list.pop();
    this.au.src = LINK_PRE + this.list[0];
    this.au.onplaying = () => (this.playing = true);
    this.au.onpause = () => (this.playing = false);
    this.au.onended = () => this.next();
  },
  methods: {
    play() {
      this.playing ? this.au.pause() : this.au.play();
    },
    next() {
      if (this.now + 1 >= this.list.length) {
        this.now = 0;
      } else {
        this.now++;
      }
      this.au.src = LINK_PRE + this.list[this.now];
      this.au.play();
    },
    slist() {
      this.showlist = !this.showlist;
    },
    itemSelected(i) {
      this.now = i;
      this.au.src = LINK_PRE + this.list[i];
      this.au.play();
    }
  }
};
</script>

<style scoped>
.player-main {
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.player {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 125px;
  height: 30px;
  background-color: white;
  pointer-events: auto;
}

.player i {
  cursor: pointer;
}

.list-out {
  overflow: hidden;
  width: 100%;
}

.play-list {
  pointer-events: auto;
  position: relative;
  background-color: #fcfcfc;
  width: 500px;
  max-width: 100%;
  height: 300px;
  overflow: auto;
  padding: 10px;
  top: 300px;
  box-sizing: border-box;

  transition: all 1s;

  float: right;
}

.play-list-show {
  top: 0;
}

.play-list li {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  color: #bdc3c7;
  cursor: pointer;
}

.playing {
  color: #7f8c8d !important;
}
</style>