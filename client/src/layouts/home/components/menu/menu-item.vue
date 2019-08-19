<template>
  <div>
    <div v-for="m in menuList" :key="m.id" class="menu-item">
      <el-menu-item :index="m.path" v-if="!m.children">
        <!-- <icon-font :icon="m.icon"></icon-font> -->
        <span slot="title" class="item-title">{{ m.name }}</span>
      </el-menu-item>

      <el-submenu v-else :index="m.id + ''">
        <template slot="title">
          <!--<i class="el-icon-menu"></i>-->
          <!-- <img v-if="checkUrl(m.icon)" class="menu-item-img" :src="m.icon" alt="" />
          <svg-icon v-else :icon-class="m.icon"></svg-icon> -->
          <span class="sub-menu-title">{{ m.name }}</span>
        </template>

        <menu-item :menuList="m.children"></menu-item>
      </el-submenu>
    </div>
  </div>
</template>

<script>
import IconFont from './icon-font.vue';

export default {
  name: 'MenuItem',
  components: {
    IconFont,
  },
  props: {
    menuList: {
      type: Array,
    },
  },
  methods: {
    checkUrl(urlString) {
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      return urlString && reg.test(urlString);
    },
  },
};
</script>
<style lang="less">
.menu-item {
  user-select: none;

  .menu-item-img {
    width: 16px;
    margin-right: 3px;
  }
}
</style>
