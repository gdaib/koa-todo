<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="menu-container"
      background-color="#2d303b"
      text-color="#fff"
      :default-active="$route.path"
      :collapse-transition="false"
      router
      :collapse="isCollapse"
      :unique-opened="false"
      @select
      active-text-color="#1890ff"
    >
      <menu-item :menuList="menuList"></menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import MenuItem from "./menu-item";
import { computed } from 'vue-function-api'
import { menuList } from "./const";

export default {
  name: "VMenu",
  components: {
    [MenuItem.name]: MenuItem
  },
  setup(props, ctx) {
    const { $store } = ctx.root

    const isCollapse = computed(() => !$store.getters.sidebar.opened)
    return {
      menuList,
      isCollapse
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