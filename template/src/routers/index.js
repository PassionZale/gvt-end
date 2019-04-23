import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("@/components/container/ContainerRoot"),
    redirect: {name: "console"},
    meta: { title: "控制台" },
    children: [
      {
        path: "console",
        name: "console",
        component: () => import("@/views/console")
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" }
  },

  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403"),
    meta: { title: 403 }
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: 404 }
  },

  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error/500"),
    meta: { title: 500 }
  },

  {
    path: "*",
    redirect: {name: "404"}
  }
]

export default new VueRouter({
  mode: "hash",
  scrollBehavior: () => ( { y: 0 } ),
  routes
})

