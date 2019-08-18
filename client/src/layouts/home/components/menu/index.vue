<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="menu-container"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>TODO</span>
        </template>
        <el-menu-item index="1-4-1">类目管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "VMenu"
};
</script>

<style lang="less">
.scrollbar-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background: #545c64;

  .el-scrollbar__wrap {
    min-height: 100%;
  }
}
</style>