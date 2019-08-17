<template>
  <div class="login-page fillcontain">
    <h1 class="title">任务管理系统</h1>

    <!-- 注册 -->
    <div class="register-panel" key="register">
      <h2>注册</h2>
      <el-form-renderer :content="registerContent" ref="form">
        <el-form-item label=" ">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="$router.push('/login')">已有账号</el-button>
        </el-form-item>
      </el-form-renderer>
    </div>
  </div>
</template>

<script>
import { plugin, value, computed, watch, onMounted } from "vue-function-api";

const registerForm = [
  {
    type: "input",
    id: "username",
    el: {
      placeholder: "用户名",
      prefixIcon: "el-icon-user"
    },
    rules: [
      {
        trigger: "blur",
        required: true,
        message: "请填写用户名"
      }
    ]
  },
  {
    type: "input",
    id: "email",
    el: {
      placeholder: "邮箱",
      prefixIcon: "el-icon-user"
    },
    rules: [
      {
        trigger: "blur",
        required: true,
        message: "请填写邮箱"
      },
      {
        type: "email",
        message: "请填写正确邮箱"
      }
    ]
  },
  {
    type: "input",
    id: "password",
    el: {
      placeholder: "密码",
      prefixIcon: "el-icon-lock"
    },
    rules: [
      {
        trigger: "blur",
        required: true,
        message: "请填写密码"
      }
    ]
  }
];


export default {
  setup() {
    const registerContent = value(registerForm);

    const register = () => {
      console.log("register");
    };

    return {
      registerContent,
      register,
      formType,
      changeFormType
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
  .login-panel,
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
    }
    .el-button + .el-button {
      margin-left: 20px;
    }
  }

  .panel-enter-active .panel-leave-active {
    transition: opacity 0.5s;
  }

  .panel-enter,
  .panel-leave-to {
    opacity: 0;
  }
}
</style>