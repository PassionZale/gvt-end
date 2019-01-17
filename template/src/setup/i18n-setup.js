import Vue from "vue"
import VueI18n from "vue-i18n"
import zhCN from "@/lang/ums/zh-CN"
import enUS from "@/lang/ums/en-US"
import Lang from "@/utils/lang"

Vue.use(VueI18n)
Vue.locale = () => {};

export const i18n = new VueI18n({
  locale: "zh-CN",
  fallbackLocale: "zh-CN",
  messages: { "zh-CN": zhCN, "en-US": enUS },
  silentTranslationWarn: process.NODE_ENV === "production"
})

export function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}

export function routerT(path, locale=Lang.getLang(), values) {
  return i18n.t(path, locale, values)  
}