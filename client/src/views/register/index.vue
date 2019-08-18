<template>
  <div class="login-page fillcontain">
    <h1 class="title">任务管理系统</h1>

    <!-- 注册 -->
    <div class="register-panel" key="register" v-show="!registerSuccess">
      <h2>注册</h2>
      <el-form-renderer :content="registerContent" ref="form">
        <el-form-item label=" ">
          <el-button type="primary" :loading="loading" @click="hanldeRegister">注册</el-button>
          <el-button @click="$router.push('/login')">已有账号</el-button>
        </el-form-item>
      </el-form-renderer>
    </div>

    <div class="register-success" v-if="registerSuccess">
      <h2 class="green">账号激活，邮箱验证</h2>
      <p>恭喜您注册成功。</p>
      <p>请查看您的邮箱并点击其中连接进行邮箱验证！</p>
      <p>
        没有收到？
        
        <count-button text="重新发送" @on-click="sendVertifyEmail"></count-button>
      </p>
    </div>
  </div>
</template>

<script>
import { value, computed, component } from "vue-function-api";

import { register, sendEmail } from "@/services/v1";

import { registerForm } from "./const";
import CountButton from "./components/count-button";

export default {
  components: {
    [CountButton.name]: CountButton
  },
  setup(props, ctx) {
    const registerContent = value(registerForm);
    const loading = value(false);
    const registerSuccess = value(false);

    /**
     * 发送验证邮箱
     */
    const sendVertifyEmail = () => {
      const { email } = ctx.refs.form.getFormValue();
      if (!email) return;
      const params = { email, vertifyUrl: `${location.host}#/vertifyEmail` };

      sendEmail(params).then(() =>
        setTimeout(() => {
          ctx.root.toast("邮箱发送成功");
        }, 500)
      );
    };

    const hanldeRegister = () => {
      const { form } = ctx.refs;

      form.validate(validate => {
        if (!validate) return;

        const data = ctx.refs.form.getFormValue();
        loading.value = true;

        register(data)
          .then(() => {
            ctx.root.toast("注册成功");
            registerSuccess.value = true;
          })
          .finally(() => {
            loading.value = false;
          });
      });
    };

    return {
      registerContent,
      hanldeRegister,
      loading,
      registerSuccess,
      sendVertifyEmail
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