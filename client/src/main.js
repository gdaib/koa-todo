import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import { plugin } from "vue-function-api";

import "./styles.scss";

Vue.use(ElementUI);
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
