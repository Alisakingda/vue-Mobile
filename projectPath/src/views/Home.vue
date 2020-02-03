<template>
  <div class="home">
    <myScroll
      ref="myScroll"
      :on-refresh="onRefresh"
      :on-pull="onPull"
      :get-scroll-top="getTop"
      :scroll-state="scrollState"
    >
      <div slot="scrollList">
        <div style="height: 200px;" v-for="(item, key) in dataList" :key="key">
          {{ item }}
        </div>
      </div>
    </myScroll>
    <!-- <Scroll></Scroll> -->
    <!-- <span v-for="(item,key) in vm_data" :key="key">
      <img :src="item.thumbnail_pic_s" alt />
    </span> -->
    <!-- <div class="box" style="width:100%;height:300px;border:1px solid yellow;"></div> -->
    <!-- <div id="mse"></div>
    <div id="vs"></div>
    <div id="canvas">
      <canvas></canvas>
    </div>-->
    <!-- <h1>Vuex test</h1> -->
    <!-- <span>{{this.$store.state.count}}</span> -->
    <!-- <span>{{getCount}}</span>
    <span>{{count}}</span>
    <button @click.prevent="increment">+10</button>

    <h2>Home</h2>
    <span>{{home}}</span>
    <h2>About</h2>
    <span>{{about}}</span>-->
  </div>
</template>

<script>
import XGPlayer from "xgplayer";
import Music from "xgplayer-music";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import myScroll from "../components/scroll/vue-scroll.vue";

import mockdata from "@/mock";
// import { mapGetters, mapActions } from "vuex";
// import api from "api";

export default {
  name: "home",
  components: {
    myScroll
  },
  props: {},
  data() {
    return {
      dataList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      vm_data: "",
      scrollState: true, //是否可以滑动
      indexScrollTop: 0
      // listdata: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["get_homeData"]) // 获取state
  },
  methods: {
    ...mapActions(["set_homedata"]), //
    player() {
      let player = new XGPlayer({
        id: "mse",
        url: "static/mv/AOA - (CHAN MI Ver.) (Teaser).mp4",
        fluid: true,
        videoInit: true,
        autoplay: true,
        volume: 0.3
      });
      document.querySelector(".xgplayer-cover").style.display = "none";
      document.querySelector(".xgplayer-name").style.display = "none";
    },
    music() {
      // let player = new Music({
      //   id: "vs",
      //   url: [
      //     {
      //       src: "static/music/003.mp3",
      //       name: "终于遇见-庄心妍",
      //       vid: "000001"
      //       // poster: "static/img/003.jpg"
      //     },
      //     {
      //       src: "static/music/002.mp3",
      //       name: "等你下课-周杰伦",
      //       vid: "000002"
      //       // poster: "static/img/002.jpg"
      //     },
      //     {
      //       src: "static/music/001.mp3",
      //       name: "想你-张国荣",
      //       vid: "000003"
      //       // poster: "static/img/001.jpg"
      //     }
      //   ],
      //   volume: 1,
      //   preloadNext: true
      // });
      // document.querySelector(".xgplayer-cover").style.display = "none";
      // document.querySelector(".xgplayer-name").style.width = "200%";
      // // let an = player.analyze(document.querySelector("canvas")); // 显示波谱图
    },
    onRefresh(mun) {
      // 刷新
      // this.listParams.p = 1;
      // this.$axios
      //   .get(apiUrl.noticeList, {
      //     params: this.listParams,
      //     isLoading: false
      //   })
      //   .then(res => {
      //     if (res.code == 10000) {
      //       this.listParams.p++;
      //       this.listdata = res.data;
      //       this.$refs.myScroll.setState(3);
      //     } else {
      //       this.$refs.myScroll.setState(3);
      //     }
      //   });
      setTimeout(() => {
        this.$refs.myScroll.setState(3);
      }, 2000);
    },
    onPull(mun) {
      //加载
      console.log(mun);
      setTimeout(() => {
        // let arr = [];
        // for (let i = 0; i <= 9; i++) {
        //   arr.push(Math.random() + 2);
        // }
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        arr.map((v, k) => {
          this.dataList.push(v);
        });
        // console.log(arr);
        // this.dataList.concat(arr);
        this.$refs.myScroll.setState(5);
      }, 1000);
      // this.$axios
      //   .get(apiUrl.noticeList, {
      //     params: this.listParams,
      //     isLoading: false
      //   })
      //   .then(res => {
      //     if (res.code == 10000 && res.data.length > 0) {
      //       this.listParams.p++;
      //       res.data.map((v, k) => {
      //         this.listdata.push(v);
      //       });
      //       this.$refs.myScroll.setState(5);
      //     } else {
      //       this.$refs.myScroll.setState(7);
      //     }
      //   });
    },
    getTop(y) {
      //滚动条位置
      this.indexScrollTop = y;
    }
  },
  created() {
    // this.$axios
    //   .get("msg")
    //   .then(res => {
    //     this.vm_data = res.data.articles;
    //   })
    //   .catch(err => console.log(err));
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
#mes {
  width: 100%;
}
#vs {
  width: 100%;
}
.home {
  width: 100vw;
  height: 100vh;
}
#canvas {
  canvas {
    width: 100%;
    height: 100px;
  }
}
</style>
