const prefixToken = "GVT_AUTH_TOKEN";

class Auth {

  constructor() {}

  static setToken(token) {
    return localStorage.setItem(prefixToken, token);
  }

  static getToken() {
    return localStorage.getItem(prefixToken);
  }

  static removeToken() {
    return localStorage.removeItem(prefixToken);
  }

  static logOut() {
    this.removeToken();
    window.location.hash = "/login";
  }

}

export default Auth;
