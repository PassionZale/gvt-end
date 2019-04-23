import Vue from "vue"
import HeroUI from "gvt-hero"
import App from "./App.vue"
import router from "./routers"
import store from "./vuex/store"
import iView from "iview"
import VueBus from "./utils/bus"
import Auth from "./utils/auth"
import Lang from "./utils/lang"
import { i18n, setI18nLanguage } from "@/utils/i18n"
import * as filters from './filters'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(HeroUI);
Vue.use(VueBus);

const cleanLangAndTokenQuery = (to, from, next) => {
  to.query.token && delete to.query.token
  if (to.query.lang) {
    delete to.query.lang
    if (from.path === to.path) {
      iView.LoadingBar.finish()
    }
    next({
      replace: true,
      path: to.path,
      params: to.params,
      query: to.query
    });
  } else {
    next();
  }
}

/**
 * 路径白名单
 *
 * 任意场景都能无阻碍访问
 */
const accessRoutePath = ["/login", "/403", "/404", "/500"];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();

  if (to.query.lang) {
    Lang.setLang(to.query.lang)
  } else {
    !Lang.getLang() && Lang.setLang()
  }
  setI18nLanguage(Lang.getLang())
  
  if (to.query.token) {
    Auth.setToken(to.query.token)
  }

  if (Auth.getToken()) {
    if (to.path === "/login" || to.path === "/") {
      next({ path: "/console" });
      iView.LoadingBar.finish();
    } else {
      if (store.getters.user.id === "") {
        store.dispatch("FetchUserData").then(apps => {

          store.dispatch("InitPermissionByApps", apps).then(() => {
            cleanLangAndTokenQuery(to, from, next)
          })

        }).catch(error => {
          Auth.removeToken()
          if (error && error.source === "action") {
            next({ path: `/${error.redirect}` })
          } else {
            next({ path: "/login" })
          }
        })
      } else {
        cleanLangAndTokenQuery(to, from, next)
      }
    }
  } else {
    if (accessRoutePath.indexOf(to.path) > -1) {
      cleanLangAndTokenQuery(to, from, next)
    } else {
      next({ path: "/login" });
      iView.LoadingBar.finish();
    }
  }
});

// 注入全部过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.afterEach(router => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
});
