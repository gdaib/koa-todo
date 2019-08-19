<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="menu-container"
      background-color="#2d303b"
      text-color="#fff"
      :default-active="$route.path"
      :collapse-transition="false"
      router
      active-text-color="#ffd04b"
    >
      <menu-item :menuList="menuList"></menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import MenuItem from "./menu-item";

import { menuList } from "./const";

export default {
  name: "VMenu",
  components: {
    [MenuItem.name]: MenuItem
  },
  setup() {
    return {
      menuList
    };
  }
};
</script>

<style lang="less">
.scrollbar-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background: #2d303b;
  overflow: hidden;

  .el-scrollbar__wrap {
    min-height: 100%;
  }
}
</style>