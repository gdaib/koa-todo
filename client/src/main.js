import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import { plugin } from "vue-function-api";
import ElFormRenderer from "@femessage/el-form-renderer";

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/index.less";

import "./global";

Vue.use(ElementUI);

Vue.use(plugin);
Vue.component(ElFormRenderer.name, ElFormRenderer);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
