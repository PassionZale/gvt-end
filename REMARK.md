前端项目模板
====

安装
----

- 3 commands

``` shell
vue init PassionZale/gvt-end ${YOUR_PROJECT_NAME}

cd ${YOUR_PROJECT_NAME}

npm install
```

- 5 options

配置项 | 类型 | 示例 | 说明
---  | --- | --- | ---
USER_LOGIN_API_URL | String | "/auth/login" | 用户登录 API URL
USER_INFO_API_URL | String | "/auth/getUserRelateData" | 用户信息 API URL
APP_CODE_LIST | Array | ["eos-admin", "eos-store"] | 子系统 APP CODE LIST
FRONTEND_DOMAIN | String | "http://localhost:8080/#" | 前端 domain, 用以 mock 菜单数据
BACKEND_DOMAIN | String | "http://192.168.1.81:18001" | 后端 domain, 用以赋值 axios.baseURL

内置公共视图
----

- Login View (登录)

- 403 View   (产品编码校验失败)

- 404 View   (路由匹配失败)

- 500 View   (服务端 internel error)

ROUTER HOOK
----
统一了路由钩子函数.

VUEX MODULE
----

依据 UMS 现阶段数据结构、交互等, 规范了 ```user```、```permission``` 状态管理, 包括: ```state(数据结构)```、```mutation(修改方式)```、```action(操作方式)```


HTTP MODULE
----

统一了 axios 封装, 拦截器的封装.

CSS RESET
----
依据《平台规范》```(./static/平台规范.png)``` , 使用 ```less``` 定义了相关 variables ```(./src/styles/variables.less)``` , 生成了一份 reset 样式表 ```(./src/styles/iview-reset.less)```

其他
----

- 对接了公共组件

- 侧边栏菜单数据 ```本地``` 与 ```线上``` 数据源依据环境变量进行优雅切换

- 集成了 ```vue-router```、```vuex```、```gvt-hero```、```iview```

- 完善了 ```中央事件总线```

- 增加了 ```helper module```, 内置 ```组件查询```、```深度克隆```、```笛卡尔积```、```数据类型``` 等工具函数
