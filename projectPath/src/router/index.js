import Vue from "vue"; // vue
import Router from "vue-router"; // vue-router
Vue.use(Router);

export default new Router({
  mode: "history", // 去掉 #
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/login", // 重定向
      component: resolve => require(["@/views/Login"], resolve)
    },
    {
      path: "/login",
      name: "Login",
      component: resolve => require(["@/views/Login"], resolve)
    },
    {
      path: "/register",
      name: "Register",
      component: resolve => require(["@/views/Register"], resolve)
    },
    {
      path: "/404",
      name: 404,
      component: resolve => require(["@/views/404"], resolve)
    },
    {
      path: "/home",
      name: "Home",
      // meta: {
      //   requireAuth: true // 需要授权authorized
      // },
      component: resolve => require(["@/views/home"], resolve)
    }
  ]
});
