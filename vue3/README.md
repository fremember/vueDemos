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
3、Choose a version of Vue.js that you want to start the project with      选择vue版本
4、Use class-style component syntax?              如何选择ts的支持，会有该选择，是否使用类的形式写组件
5、Use Babel alongside TypeScript                 使用babel处理ts语法
6、Use history mode for router?                   选择路由模式，hash和history，hash会有#，history需要nginx配置重定向
7、Pick a CSS pre-processor                       选择css预处理语言
8、Pick a linter / formatter config               提供一个插件化的javascript代码检测工具
9、Pick additional lint features                  何时检查
10、Where do you prefer placing config for Babel, ESLint, etc.?             配置项放在哪儿
11、Save this as a preset for future projects?     是否保存本次配置
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
