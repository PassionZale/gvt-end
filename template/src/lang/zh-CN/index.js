import iviewZH from "iview/dist/locale/zh-CN"
import routerZH from "./router"

const lang = {
  ...iviewZH,
  
  ...routerZH,

  common: {
    pagination:           "{pageSize} 条/页",

    message: { accOrPassword: "账户或密码错误" },

    form: {
      btn: {
        search:           "搜索",
        reset:            "重置",
      },

      label: {}
    },

    table: {
      thead: {},

      tbody: {
        operate: {
          edit:            "编辑",
          remove:          "删除",
        },
      },
    },
  }
}

export default lang
