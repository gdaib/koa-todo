import Vue from "vue";
import axios from "@/services";
import dayjs from "dayjs";

Vue.mixin({
  methods: {
    toast(message = "操作成功", type = "success") {
      this.$message({
        message,
        type
      });
    },
    dateFormat(value) {
      return value && dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
});

Vue.prototype.$axios = axios;
Vue.prototype.$dayjs = dayjs;
