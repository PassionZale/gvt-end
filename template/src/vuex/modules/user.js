import { fetchUser } from "~/api/auth"
import Auth from "~/utils/auth"
import { APP_CODE_LIST } from "~/utils/env"
import { JWT_EXPIRES_CODE } from "~/utils/constants"

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

          if(JWT_EXPIRES_CODE.indexOf(response.data.code) > -1) {
            reject({ redirect: "login", msg: "登录过期, 请重新登录!" });
            return;
          }

          // 用户数据源
          const userinfo = response.data;

          /**
           * 依据自定义 app.code 校验所筛选出的 app item
           * 
           * 默认为 {}, 请不要改变它
           */
          let appFound = {};


          // START
          // 自定义 app.code 校验规则
          // 大部分情况你要改写这一段校验规则
          // --------------------------------------------------

          /**
           * 访问权限校验
           * 
           * 依据当前业务进行校验
           * 
           * 例如, 下面这一段校验业务, 此业务基于《商品库》项目实际校验逻辑
           * 
           * 
           * 假定你在 env.js 中定义了 APP_CODE_LIST = ["gms-gvt", "gms-store"]
           * 它们分别表示: 管理员所持有的 APP: GVT商品库; 商户所持有的 APP: 商户商品库
           * 
           * 通过 user.system === 1 ? "管理员" : "商户"
           * 
           * 当 user 标识为 "管理员" 时, 必须持有 app.code === "gms-gvt", 若无, 则 reject 403 error
           * 
           * 当 user 标识为 "商户" 时, 必须持有 app.code === "gms-store", 若无, 则 reject 403 error
           * 
           * 若存在符合的 app item, 则将其
           * 
           * 请依据当前系统实际业务改写这一段 if else
           * 
           */
          if (userinfo.user.system === 1) {
            appFound = userinfo.apps.find(item => item.code === APP_CODE_LIST[0]);
            if (!appFound) reject({ redirect: 403, msg: "您没有产品访问权限" });
          } else {
            let tenantId = "";
            if (userinfo.tenant && userinfo.tenant.id) {
              tenantId = userinfo.tenant.id
            } else if (userinfo.employee && userinfo.employee.tenantId) {
              tenantId = userinfo.employee.tenantId
            }

            if (tenantId === "") {
              reject({ redirect: 403, msg: "用户身份未知" });
            } else {
              appFound = userinfo.apps.find(item => item.code === APP_CODE_LIST[1]);
              if (!appFound) reject({ redirect: 403, msg: "您没有产品访问权限" });
            }
          }

          // --------------------------------------------------
          // 自定义 app.code 校验规则
          // END


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
          reject({ redirect: 500, msg: "无法拉取用户数据, 请稍后再试!"});
        })
      })
    },

    Logout({ commit }) {
      commit("LOGOUT_USER");
    }
  }
}

export default user
