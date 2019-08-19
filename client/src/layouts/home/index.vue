<template>
  <el-container class="content-main">
    <el-aside width="200px">
      <v-menu></v-menu>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <v-header></v-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { value, onMounted } from "vue-function-api";

import Header from "./components/header";
import VMenu from "./components/menu";

export default {
  components: {
    [Header.name]: Header,
    [VMenu.name]: VMenu
  },
  setup() {}
};
</script>

<style lang="less">
.content-main {
  height: 100%;
  min-height: 100%;

  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .el-menu {
    border-right: none;
  }
}
.el-header {
  border-bottom: 1px solid #efefef;
}
</style>