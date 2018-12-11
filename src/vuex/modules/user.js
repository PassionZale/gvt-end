import { fetchUser } from "~api/auth"
import Auth from "~utils/auth"
import { APP_CODE_LIST } from "~utils/env"

const user = {
  state: {
    // 用户 ID
    id: "",
    // 用户名
    name: "",
    // 账号
    userName: "",
    // 商户 ID
    tenantId: "",
    // 默认为商户用户
    isTenant: true
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    IS_NOT_TENANT: (state) => {
      state.isTenant = false;
    },
    LOGOUT_USER: (state) => {
      state.id = "";
      state.name = "";
      state.userName = "";
      state.tenantId = "";
      state.isTenant = true;
      Auth.logOut();
    }
  },

  actions: {

    FetchUserData({ commit }) {
      return new Promise((resolve, reject) => {
        fetchUser().then(response => {

          let app = {};

          // 接口返回的数据源
          const userinfo = response.data;

          // 当前用户为 "平台用户" (类似管理员)
          if (userinfo.user.system === 1) {
            commit("IS_NOT_TENANT");
            app = userinfo.apps.find(item => item.code === APP_CODE_LIST[0]);
            if (!app) reject({ status: 403, msg: "您没有产品访问权限" });
          } else {
            // 商户用户
            let tenantId = "";
            if (userinfo.tenant && userinfo.tenant.id) {
              tenantId = userinfo.tenant.id
            } else if (userinfo.employee && userinfo.employee.tenantId) {
              tenantId = userinfo.employee.tenantId
            }

            if (tenantId === "") {
              // tenantId 扔为空, reject error
              reject({  status: 403, msg: "用户身份未知" });
            } else {
              // tenantId 不为空, mutaition 商户 ID
              commit("SET_TENANT_ID", tenantId);
              app = userinfo.apps.find(item => item.code === APP_CODE_LIST[1]);
              if (!app) reject({ status: 403, msg: "您没有产品访问权限" });
            }
          }

          // 由于 router.beforeEach 钩子函数中, 
          // 当且仅当 app 存在, 并且不为空对象, 才更新其他 state
          if (app && JSON.stringify(app) !== "{}") {
            // mutation 用户 ID
            commit("SET_ID", userinfo.user.id);

            // mutation 用户 名称
            commit("SET_NAME", userinfo.user.name);

            // mutation 账户
            commit("SET_USERNAME", userinfo.user.userName);
          }

          // resolve apps
          resolve(userinfo.apps);

        }).catch(error => {
          reject({ status: 500, msg: "无法拉取用户数据, 请稍后再试!"});
        })
      })
    },

    Logout({ commit }) {
      commit("LOGOUT_USER");
    }
  }
}

export default user
