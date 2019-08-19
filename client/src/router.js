import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layouts/home";

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      redirect: "/todo"
    },
    {
      path: "/login",
      name: "login",
      component: () => import(`@/views/login.vue`)
    },
    {
      path: "/register",
      name: "register",
      component: () => import(`@/views/register/index.vue`)
    },
    {
      path: "/vertifyEmail",
      name: "vertifyEmail",
      component: () => import(`@/views/vertifyEmail/index.vue`)
    },
    {
      path: "/todo",
      component: Layout,
      redirect: "/todo/index",
      children: [
        {
          path: "index",
          component: () => import("@/views/todo/index.vue"),
          name: "Todo",
          meta: { title: "Todo" }
        },
        {
          path: "category",
          component: () => import("@/views/todo-category/index.vue"),
          name: "Category",
          meta: { title: "Category" }
        }
      ]
    }
  ]
});
