<template>
  <hero-login
    @login="submit"
    :locale.sync="lang"
    :login-back-url="oemConfigs.loginBackUrl"
    :login-url="oemConfigs.loginUrl"
    :domain-icp-no="oemConfigs.domainIcpNo"
  >
    <div class="tp-login-item" v-for="item in supports" @click="tpLoginClick(item.loginUrl)">
      <img :src="'static/' + item.code + '.png'" />
      <span v-show="item.code === 'WEIXIN'">{{$t('loginForm.tpLoginText.weixin')}}</span>
      <span v-show="item.code === 'ALIPAY'">{{$t('loginForm.tpLoginText.alipay')}}</span>
    </div>
  </hero-login>
</template>

<script>
import md5 from "js-md5";
import { login, supportType, getOemByDomain } from "@/api/auth";
import Auth from "@/utils/auth";
import Lang from "@/utils/lang";
import { setI18nLanguage } from "@/setup/i18n-setup";
import { redirect } from "@/utils/helper";
import {
  BACKEND_DOMAIN,
  WEBPACK_DEV_SERVER_PROXY_TARGET,
  ENV
} from "@/utils/env";

export default {
  name: "auth-login",

  data() {
    return {
      lang: Lang.getLang(),
      supports: [],
      oemConfigs: {}
    };
  },

  watch: {
    lang(lang) {
      setI18nLanguage(lang);
    }
  },

  computed: {
    backendDomain() {
      return BACKEND_DOMAIN === "/api"
        ? WEBPACK_DEV_SERVER_PROXY_TARGET
        : BACKEND_DOMAIN;
    }
  },

  created() {
    supportType().then(response => {
      this.supports = response.data;
    });
    getOemByDomain(window.location.hostname).then(response => {
      this.oemConfigs = response.data || {};
    });
  },

  mounted() {
    document.title = `Astraea - ${this.$t("loginForm.loginBtn")}`;
  },

  methods: {
    tpLoginClick(redirectUrl) {
      redirect(this.backendDomain + redirectUrl);
    },

    submit(user) {
      const params = Object.assign({}, user, {
        password: md5(user.password)
      });
      login(params)
        .then(response => {
          const jwt = response.data.token;
          Auth.setToken(jwt);
          Lang.setLang(this.lang);
          this.$router.push("/");
        })
        .catch(error => {
          this.$Message.error(this.$t("common.message.accOrPassword"));
        });
    }
  }
};
</script>

<style lang="less">
.tp-login-item {
  margin-top: 10px;
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  user-select: none;

  img {
    display: inline-block;
    height: 100%;
    width: auto;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
    text-align: left;
    color: #999;
  }
}
</style>