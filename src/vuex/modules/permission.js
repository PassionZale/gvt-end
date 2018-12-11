function parseApps(apps) {

  let permissions = [];
  let menus = [];

  // 递归解析全部 permission code list
  function loop(arr) {
    arr.some(item => {
      permissions.push(item.code);
      if (item.childBisFunction && item.childBisFunction.length) {
        permissions.push(item.code);
        loop(item.childBisFunction);
      }
    });
  }

  if(apps.length) {
    // loop apps
    apps.forEach(app => {
      // parse permission code list
      loop(app.bisFunctions);
      // parse menu data
      app.bisFunctions.forEach(item => {
        let obj = {name: item.name, icon: item.icon, uri: `${item.uri}`, childBisFunction: item.childBisFunction || []};
        if(item.childBisFunction) {
          obj.childBisFunction = item.childBisFunction.map(child => ({name: child.name, icon: child.icon, uri: `${child.uri}`}));
        }
        menus.push(obj);
      })
    });
  }

  return { menus, permissions: [... new Set(permissions)] };
}

const permission = {
  state: {
    // 权限列表
    permissions: [],
    // 菜单数据
    menus: []
  },

  mutations: {
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    }
  },

  actions: {
    InitPermissionByApps({ commit }, apps) {
      return new Promise((resolve, reject) => {
        const data = parseApps(apps);
        commit("SET_PERMISSIONS", data.permissions);
        commit("SET_MENUS", data.menus);
        resolve();
      });
    }
  }
}

export default permission;
