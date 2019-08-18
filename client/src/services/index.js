import axios from "axios";
import { Message } from "element-ui";

function axiosExtra(axios) {
  for (let method of [
    "request",
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch"
  ]) {
    axios["$" + method] = function() {
      return this[method].apply(this, arguments).then(res => res && res.data);
    };
  }
}

const instance = axios.create({
  timeout: 3000,
  // transformResponse: [data => data]
  validateStatus: function(status) {
    return true;
  }
});

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

const whiteStatus = [200, 304, 400];

// http response 拦截器
instance.interceptors.response.use(
  res => {
    const { data, status } = res;

    if (!whiteStatus.includes(status)) {
      Message.error({
        message: "系统错误，请稍后再试..."
      });
      return Promise.reject(data);
    }

    if (data.code && data.code !== 0) {
      Message.error({
        message: data.message || "系统错误，请稍后再试..."
      });
      return Promise.reject(data);
    }

    return res;
  },
  error => {
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 401 清除token信息并跳转到登录页面
    //       store.commit(types.LOGOUT);

    //       // 只有在当前路由不是登录页面才跳转
    //       router.currentRoute.path !== "login" &&
    //         router.replace({
    //           path: "login",
    //           query: { redirect: router.currentRoute.path }
    //         });
    //   }
    // }
    return Promise.reject(error);
  }
);

axiosExtra(instance);

export default instance;
