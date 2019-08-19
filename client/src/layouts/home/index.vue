<template>
  <el-container class="content-main">
    <el-aside :width="`${sideWidth}px`">
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
import { value, onMounted, computed } from "vue-function-api";

import Header from "./components/header";
import VMenu from "./components/menu";

export default {
  components: {
    [Header.name]: Header,
    [VMenu.name]: VMenu
  },
  setup(props, ctx) {
    const { $store } = ctx.root;

    const sidebar = computed(() => $store.getters.sidebar);

    const sideWidth = computed(() => {
      return sidebar.value.opened ? 200 : 120;
    })


    return {
      sidebar,
      sideWidth
    };
  }
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