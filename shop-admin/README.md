# 商场管理后台

## 技术栈需求
```
vue3.0 + vite + vuex + elementplus + windicss + vue-router + vueuse + axios
```

## 准备工作
```
1、修改npm源 : npm config set registry=https://registry.npmmirror.com
2、要构建一个 Vite + Vue 项目
npm 6.x 执行 npm create vite@latest my-vue-app --template vue
npm 7+ 执行 npm create vite@latest my-vue-app -- --template vue
3、安装vscode使用的插件
volar vue文件的高亮和代码提示
Vue Language Features vue语法提示
Vue 3 Snippets vue3的代码提示
Element Plus Snippets elementPlus提示
windicss
4、在 vite.config.js 中配置相对路径
resolve: {
    alias: {
        "@": path.resolve(__dirname, "src")
    }
}
```

## 脚本解释
```
运行项目：npm run dev
打包项目：npm run build
```

### 安装插件
```
安装 element-plus : npm install element-plus --save
安装 icon : npm install @element-plus/icons-vue
安装 windicss 并在 vite.config.js 和 main.js 中引入 : npm install -D vite-plugin-windicss windicss
安装 vue-router : npm install vue-router@4
安装 axios : npm install axios
安装和使用 cookie : npm install @vueuse/integrations universal-cookie
安装 vuex : npm install vuex@next --save
安装 nprogress 实现全屏进度条 : npm install nprogress
安装 vueuse/core 解决全屏展示问题 : npm i @vueuse/core
安装 gsap 实现数字的动画效果,具体实例在components/CountTo.vue : npm install gsap
安装 echarts 绘制表格 : npm install echarts
```
