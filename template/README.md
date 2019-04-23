gvt-end
=======

The End Of GVT Travel

安装
----

```shell
vue init PassionZale/gvt-end ${YOUR_PROJECT_NAME}

cd ${YOUR_PROJECT_NAME}

npm install

vim ./src/utils/env.js

# 依据下方配置项配置 env.js 后

npm run dev
```

配置 ```./src/utils/env.js```
----

配置项 | 类型 | 示例 | 说明
---  | --- | --- | ---
USER_LOGIN_API_URL | String | "/auth/login" | 用户登录 API URL
USER_INFO_API_URL | String | "/auth/getUserRelateData" | 用户信息 API URL
APP_CODE_LIST | Array | ["eos-admin", "eos-store"] | 子系统 APP CODE LIST
FRONTEND_DOMAIN | String | "http://localhost:8080/#" | 前端 domain, 用以 mock 菜单数据
BACKEND_DOMAIN | String | "http://192.168.1.81:18001" | 后端 domain, 用以赋值 axios.baseURL
ENV | String | "release" | Nodejs 环境变量

配置 ```./src/mock/menuData.js```
---

由于本地开发时, UMS 可能还未配置相应数据, 我们可以在此 ```js``` 中, 写入菜单数据

```predev```
----

在运行时, 加入了 ```predev hook```, 它会执行 ```./env_validator.js```, 其检查项如下:

- USER_LOGIN_API_URL

- USER_INFO_API_URL