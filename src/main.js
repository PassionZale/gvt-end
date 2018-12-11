import Vue from "vue"
import HeroUI from "gvt-hero"
import App from "./App.vue"
import router from "./routers"
import store from "./vuex/store"
import iView from "iview"
import VueBus from "./utils/bus"
import Auth from "./utils/auth"

Vue.use(iView);
Vue.use(HeroUI);
Vue.use(VueBus);

const accessRoutePath = ["/login", "/403", "/404", "/500"];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();

  to.query.token && Auth.setToken(to.query.token);

  if(Auth.getToken()) {
    if(to.path === "/login") {
      next({path: "/"});
      iView.LoadingBar.finish();
    } else {
      if(store.getters.user.id === ""){
        store.dispatch("FetchUserData").then(apps => {
          store.dispatch("InitPermissionByApps", apps).then(() => {
            next();
          })
        }).catch(error => {
          Auth.removeToken();
          next({ path: `/${error.redirect}` });
          iView.LoadingBar.finish();
        })
      }else{
        next();
      }
    }
  }else {
    if(accessRoutePath.indexOf(to.path) > -1) {
      next();
    }else {
      next({path: "/login"});
      iView.LoadingBar.finish();
    }
  }
});

router.afterEach(router => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
