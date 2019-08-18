<template>
  <div class="header">
    <div class="left-panel">
      <i class="menu-icon" :class="menuIcon" @click="open = !open"></i>
    </div>
    <div class="right-panel">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{user.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
          <!-- <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { computed, value } from "vue-function-api";
export default {
  name: "VHeader",
  setup(props, ctx) {
    const { $store } = ctx.root;

    const open = value(true);

    const user = computed(() => {
      return $store.state.user;
    });

    const menuIcon = computed(() => {
      return open.value ? "el-icon-s-fold" : "el-icon-s-unfold";
    });

    return {
      user,
      open,
      menuIcon
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .left-panel {
    > .menu-icon {
      cursor: pointer;
      font-size: 24px;
      font-weight: 500;
    }
  }
}
</style>
