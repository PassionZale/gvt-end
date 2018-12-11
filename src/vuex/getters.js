const getters = {
  user: state => state.user,
  permissions : state => state.permission.permissions,
  menus: state => state.permission.menus,
}

export default getters