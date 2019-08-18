<template>
  <div class="login-page fillcontain">
    <h1 class="title">任务管理系统</h1>

    <div class="register-success" v-loading="loading">
      <h2 class="green">账号激活</h2>
      <p>{{msg}}</p>
      <el-button @click="$router.push('/login')">立即登录</el-button>
    </div>
  </div>
</template>

<script>
import { value, onMounted } from "vue-function-api";

import { vertifyEmailAPi } from "@/services/v1";

export default {
  setup(props, ctx) {
    const msg = value("验证中...");
    const loading = value(true);
    const { $route, $router, toast } = ctx.root;

    const vertifyEmail = () => {
      const { token } = $route.query;

      vertifyEmailAPi({ token })
        .then(() => {
          msg.value = '验证邮箱成功'
          toast("验证邮箱成功")
        })
        .catch(() => {
          msg.value = "验证失败..";
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      vertifyEmail();
    });

    return {
      msg,
      loading
    };
  }
};
</script>

<style lang="less">
.login-page {
  background: #324057;
  color: #fff;

  .title {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 36px;
    font-weight: 700;
  }
  .register-success,
  .register-panel {
    position: absolute;
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    left: 50%;
    top: 30%;
    transform: translate(-50%, 0);
    width: 400px;

    > h2 {
      color: #324057;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      &.green {
        color: #47c479;
      }
    }
    > p {
      text-align: center;
      font-size: 16px;
      color: #000;
      word-wrap: normal;
      line-height: 30px;
    }
    .el-button + .el-button {
      margin-left: 20px;
    }
  }

  .icon {
    display: inline-block;
    font-size: 14px;
  }
}
</style>