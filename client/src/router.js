import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

import Layout from "@/layouts/home";

const router = new Router({
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

const whiteRoutes = ["/login", "/register"];

router.beforeEach((to, from, next) => {
  if (!store.state.user.token) {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      next("/login");
    } else {
      store.commit("update", { user: JSON.parse(userData) });
      whiteRoutes.includes(to.path) ? next("/todo") : next();
    }
  } else {
    if (whiteRoutes.includes(to.path)) {
      next("/todo");
    } else {
      next();
    }
  }
});

export default router;
