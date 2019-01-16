import Vue from "vue"
import VueI18n from "vue-i18n"
import zhCN from "@/lang/ums/zh-CN"

Vue.use(VueI18n)
Vue.locale = () => {};

export const i18n = new VueI18n({
  locale: "zh-CN",
  fallbackLocale: "zh-CN",
  messages: { "zh-CN": zhCN },
  silentTranslationWarn: process.NODE_ENV === "production"
})

const loadedLanguages = ["zh-CN"]

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/ums/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    } 
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
