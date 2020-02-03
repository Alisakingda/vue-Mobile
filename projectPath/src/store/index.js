import Vue from "vue";
import Vuex from "vuex";
// import Home from "./modules/Home";
// import About from "./modules/About";
import home from "./modules/home/home";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home
  }
});
