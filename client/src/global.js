import Vue from "vue";

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
