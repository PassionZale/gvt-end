var env = require("../utils/env");

var domain = env.FRONTEND_DOMAIN;

var menuData = [
  {
    name: "控制台",
    uri: `${domain}/console`,
    icon: "icon-mywork"
  },
  {
    name: "一级菜单",
    uri: `${domain}/a`,
    icon: "icon-setting",
    childBisFunction: [
      {
        name: "二级菜单-1",
        uri: `${domain}/1-1`,
      },
      {
        name: "二级菜单-2",
        uri: `${domain}/1-2`,
      },
      {
        name: "二级菜单-3",
        uri: `${domain}/1-3`,
      }
    ]
  }
];

module.exports = { menuData };