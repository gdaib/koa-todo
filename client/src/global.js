import Vue from "vue";
import axios from "@/services";

Vue.mixin({
  methods: {
    toast(message = "操作成功", type = "success") {
      this.$message({
        message,
        type
      });
    }
  }
});


Vue.prototype.$axios = axios;
