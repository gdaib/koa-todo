export const registerForm = [
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
    id: "email",
    type: "input",
    el: {
      placeholder: "邮箱",
      prefixIcon: "iconfont icon-email icon"
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
      prefixIcon: "el-icon-lock",
      type: "password"
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
