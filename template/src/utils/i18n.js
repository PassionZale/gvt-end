import Vue from "vue"
import VueI18n from "vue-i18n"
import zhCN from "@/lang/zh-CN"
import enUS from "@/lang/en-US"

Vue.use(VueI18n)
Vue.locale = () => { };

const i18n = new VueI18n({
  locale: "zh-CN",
  fallbackLocale: "zh-CN",
  messages: { "zh-CN": zhCN, "en-US": enUS },
  silentTranslationWarn: process.NODE_ENV === "production"
})

const setI18nLanguage = lang => {
  i18n.locale = lang
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}

export default i18n;

export {
  i18n,
  setI18nLanguage
}