import Vue from "vue"
import VueRouter from "vue-router"

import ContainerRoot from "@/components/container/ContainerRoot.vue"
import Console from "@/views/console/Index.vue"
import Login from "@/views/auth/Login.vue"
import * as ErrorView from "@/views/error"
import { routerT } from "@/setup/i18n-setup"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    component: ContainerRoot,
    redirect: {name: "console"},
    meta: { title: routerT("router.consoles") },
    children: [
      {
        path: "console",
        name: "console",
        component: Console
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "登录" }
  },

  {
    path: "/403",
    name: "403",
    component: ErrorView.Error403,
    meta: { title: 403 }
  },

  {
    path: "/404",
    name: "404",
    component: ErrorView.Error404,
    meta: { title: 404 }
  },

  {
    path: "/500",
    name: "500",
    component: ErrorView.Error500,
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

