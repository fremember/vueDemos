<!--
 * @Author: fremember
 * @Date: 2021-07-09 10:13:23
 * @Description: 
-->
# vue3入门教程

## 1、新建项目
```
1、安装脚手架工具：
    npm install -g @vue/cli
    或者：cnpm install -g @vue/cli
2、新建项目：vue create projectName
3、选择配置项
    Please pick a preset: (Use arrow keys)        请选择预设，这里选择第三个Manually select features(手动选择)
    Check the features needed for your project    检查项目所需的功能
        ◉ Choose Vue version                      选择vue版本
        ◉ Babel                                   转码器，可以将ES6代码转为ES5代码，从而在现有环境执行
        ◯ TypeScript                              选择ts的支持，文件后缀名是.ts
        ◯ Progressive Web App (PWA) Support       渐进式Web应用程序
        ◯ Router                                  vue路由
        ◯ Vuex                                    vue状态管理
        ◯ CSS Pre-processors                      css预处理
        ◉ Linter / Formatter                      代码风格检查和格式化（如：ESlint）
        ◯ Unit Testing                            单元测试
        ◯ E2E Testing                             e2e（end to end） 测试
    Choose a version of Vue.js that you want to start the project with      选择vue版本
    Use class-style component syntax?              如何选择ts的支持，会有该选择，是否使用类的形式写组件
    Use Babel alongside TypeScript                 使用babel处理ts语法
    Use history mode for router?                   选择路由模式，hash和history，hash会有#，history需要nginx配置重定向
    Pick a CSS pre-processor                       选择css预处理语言
    Pick a linter / formatter config               提供一个插件化的javascript代码检测工具
    Pick additional lint features                  何时检查
    Where do you prefer placing config for Babel, ESLint, etc.?             配置项放在哪儿
    Save this as a preset for future projects?     是否保存本次配置
4、启动项目
    npm run serve
5、项目打包
    npm run build
```

### 2、新特性
```
1、更快更省
    Object.defineProperty ——> Proxy
    重构 Virtual DOM
2、完全的TypeScript
    团队开发更轻松
    架构更灵活，阅读源码更轻松
    可以独立使用Vue内部模块
3、Composition API（组合式API）
    一组低侵入式的、函数式的 API
    更好的逻辑复用与代码组织
    更好的类型推导
```

### 3、setup函数
```
setup 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。
1、调用时机
    setup 函数会在 beforeCreatee 钩子之前被调用，在 setup 函数中无法访问 this
2、返回值
    如果 setup 返回一个对象，则对象的属性可以在组件模板中被访问
3、[参数](https://github.com/fremember/vueDemos/blob/master/vue3/src/views/props/index.vue)
    第一个参数为 [props](https://github.com/fremember/vueDemos/blob/master/vue3/src/views/props/index.vue) ，接收当前组件props选项的值，即获取父组件传递过来的参数
    第二个参数为 context ，接收一个上下文对象，该对象中包含了一些在 vue 2.x 中需要通过 this 才能 访问到属性
```

### 4、响应式系统API
```
Vue 3.0提供的一组具有响应式特性的函数式API，都是以函数形式提供的
1、reactive
    `reactive()`函数接收一个普通对象，返回该普通对象的响应式代理对象
​	 简单来说，就是用来创建响应式的数据对象，等同于`vue 2.x` 的 `Vue.observable()`函数
2、ref
    `ref()`函数接收一个参数值，返回一个响应式的数据对象。该对象只包含一个指向内部值的 `.value` 属性
        基本用法
        在模板中访问时，无需通过.value属性，它会自动展开 
        在reactive对象中访问时，无需通过.value属性，它会自动展开 
3、computed
    `computed()` 函数用来创建计算属性，函数的返回值是一个 `ref` 的实例
        只读的计算属性
        可读可写的计算属性
4、readonly
    `readonly()`函数接收一个对象（普通或响应式），返回一个原始对象的只读代理对象
5、watch
    `watch()` 函数用来监视数据的变化，从而触发特定的操作，等同于 vue 2.x中的 `this.$watch`
        监视单个数据源
        监视多个数据源
        取消监视
        清除无效的异步任务
6、watchEffect
    `watchEffect()`函数接收一个函数作为参数，并立即执行该函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
