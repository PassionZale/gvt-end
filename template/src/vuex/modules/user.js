import { fetchUser } from "@/api/auth"
import Auth from "@/utils/auth"
import { APP_CODE_LIST } from "@/utils/env"

const user = {
  state: {
    // 用户 ID
    id: "",
    // 用户名
    name: "",
    // 账号
    userName: "",
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
      state.isTenant = true;
      Auth.logOut();
    }
  },

  actions: {

    FetchUserData({ commit }) {
      return new Promise((resolve, reject) => {
        fetchUser().then(response => {

          // 用户数据源
          const userinfo = response.data;

          /**
           * 依据自定义 app.code 校验所筛选出的 app item
           * 
           * 默认为 {}, 请不要改变它
           */
          let appFound = {};

          /**
           * 在此处编写自定义 app code 校验规则
           */
          appFound = true;

          /**
           * 由于 router.beforEach() 中
           * 
           * 依据 user.id = true or false
           * 
           * 来判断是否进行用户信息的拉取
           * 
           * 因此, 你必须要在 appFound 完成初始化"后", 且不为空对象"时"
           * 
           *  ----- 才可更新其他的 state -----
           */
          if (appFound && JSON.stringify(appFound) !== "{}") {
            // mutation 用户 ID
            commit("SET_ID", userinfo.user.id);

            // mutation 用户 名称
            commit("SET_NAME", userinfo.user.name);

            // mutation 账户
            commit("SET_USERNAME", userinfo.user.userName);

            // mutation 商户 or !商户
            userinfo.user.system === 1 && commit("IS_NOT_TENANT");
          }

          // resolve apps
          resolve(userinfo.apps);

        }).catch(error => {
          if(error && error.redirect) {
            reject(error);
          } else {
            reject({ redirect: 500, msg: "无法拉取用户数据, 请稍后再试!"});
          }
        })
      })
    },

    Logout({ commit }) {
      commit("LOGOUT_USER");
    }
  }
}

export default user
