import iviewEN from "iview/dist/locale/en-US"
import routerEN from "./router"

const lang = {
  ...iviewEN,
  
  ...routerEN,

  common: {
    pagination:           "{pageSize} /page",

    message: { accOrPassword: "Wrong account or password" },

    form: {
      btn: {
        search:           "Search",
        reset:            "Rest",
      },

      label: {}
    },

    table: {
      thead: {},

      tbody: {
        operate: {
          edit:            "Edit",
          remove:          "Remove",
        },
      },
    },
  }
}

export default lang
