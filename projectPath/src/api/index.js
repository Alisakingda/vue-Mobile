import Env from "./env";
import axios from "axios";
import routerIndex from "@/router/index";

// let token = "";

// // axios.defaults.withCredentials = false;
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"; //配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 添加一个响应拦截器
axios.interceptors.response.use(
  function(response) {
    // if (response.data && response.data.code) {
    //   if (
    //     parseInt(response.data.code) === 108 ||
    //     parseInt(response.data.code) === 109 ||
    //     response.data.msg === "TOKEN失效，请重新登录" ||
    //     response.data.msg === "TOKEN不存在"
    //   ) {
    //     //未登录
    //     response.data.msg = "登录信息已失效，请重新登录";
    //     road.$message.error(response.data.msg);
    //     routerIndex.push("/login");
    //   }
    //   if (parseInt(response.data.code) === -1) {
    //     road.$message.error("请求失败");
    //   }
    // }
    return response;
  },
  function(error) {
    // Do something with response error
    console.dir(error);
    // road.$message.error("服务器连接失败");
    return Promise.reject(error);
  }
);

//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.post(`${base}${url}`, params).then(res => res.data);
};

export const GET = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.get(`${base}${url}`, { params: params }).then(res => res.data);
};

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data);
};

export const DELETE = (url, params) => {
  return axios
    .delete(`${base}${url}`, { params: params })
    .then(res => res.data);
};

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data);
};
