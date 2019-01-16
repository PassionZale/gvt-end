const prefixLang = "GVT_I18N_LANG";

class Lang {

  constructor() {}

  static setLang(lang = "zh-CN") {
    return localStorage.setItem(prefixLang, lang);
  }

  static getLang() {
    return localStorage.getItem(prefixLang);
  }

  static removeLang() {
    return localStorage.removeItem(prefixLang);
  }

}

export default Lang;
