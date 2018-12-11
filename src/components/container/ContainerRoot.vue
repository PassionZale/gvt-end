<template>
  <hero-layout
    username="GVT END"
    :menu-data="menuData" 
    :route-matched="routeMatched"
    @user-logout-click="logout"
  >
    <div slot="content">
      <router-view></router-view>
    </div>
  </hero-layout>
</template>

<script>
import Auth from "~utils/auth";
import { FRONTEND_DOMAIN } from "~utils/env";

export default {
  name: "container-root",

  data() {
    return {
      menuData: [],
      routeMatched: []
    }
  },

  watch: {
    $route() {
      this.routeMatched = this.$route.matched;
    }
  },

  created() {
    this.routeMatched = this.$route.matched;
  },

  mounted() {
    this.$nextTick(() => {
      this.menuData = this.mockMenuData();
    });
  },

  methods: {
    logout() {
      Auth.logOut();
    },

    mockMenuData() {
      const domain = FRONTEND_DOMAIN;
      return [
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
              uri: `${domain}/111`,
            },
            {
              name: "二级菜单-2",
              uri: `${domain}/222`,
            },
            {
              name: "二级菜单-3",
              uri: `${domain}/333`,
            }
          ]
        }
      ];
    }
  }
}
</script>

