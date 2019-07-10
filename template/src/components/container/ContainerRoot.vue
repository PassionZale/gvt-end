<template>
  <hero-layout
    :locale="locale"
    :username="user.userName"
    :menu-data="menuData"
    :route-matched="routeMatched"
    :menu-info="user.isTenant"
    :app-target="appTarget"
    :logo="user.logo"
    menu-pwd
    @user-info-click="goHome"
    @user-pwd-click="changePassword"
    @user-logout-click="logout"
  >
    <div slot="content">
      <router-view></router-view>
    </div>
  </hero-layout>
</template>

<script>
import Auth from "@/utils/auth";
import { ENV } from "@/utils/env";
import { mapGetters, mapActions } from "vuex";
import Lang from "@/utils/lang";

export default {
  name: "ContainerRoot",

  data() {
    return {
      menuData: [],
      routeMatched: [],
      locale: Lang.getLang()
    };
  },

  computed: {
    ...mapGetters(["menus", "user", "isTenant", "appTarget"])
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
      this.menuData = ENV === "development" ? this.mockMenuData() : this.menus;
    });
  },

  methods: {
    ...mapActions(["Logout"]),

    logout() {
      this.Logout();
    },

    goHome() {
      return;
    },

    changePassword() {
      return;
    },

    mockMenuData() {
      const mockData = require("../../mock/menuData.js");
      return mockData.menuData;
    }
  }
};
</script>
