import Vue from "vue";
import FastClick from "fastclick";
import App from "./App";
import router from "./router";
import animated from "animate.css"; // npm install animate.css --save安装，在引入
import Axios from "axios";
import store from "./store";

FastClick.attach(document.body);

require("@/router/guards")(router); // 路由守卫guards
Vue.use(animated);

Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.prototype.$axios = Axios;
Vue.prototype.$store = store;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app-box");
