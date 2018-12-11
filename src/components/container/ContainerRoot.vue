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
import { ENV } from "~utils/env";
import { mapGetters } from "vuex";

export default {
  name: "container-root",

  data() {
    return {
      menuData: [],
      routeMatched: []
    }
  },

  computed: {
    ...mapGetters(["menus"])
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
    logout() {
      Auth.logOut();
    },

    mockMenuData() {
      var mock = require("../../mock/menuData.js");
      return mock.menuData;
    }
  }
}
</script>

