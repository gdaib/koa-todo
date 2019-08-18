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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
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
        }
      ]
    }
  ]
});
