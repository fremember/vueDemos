# 基于 element-plus 的组件(二次)封装

## 技术栈需求
```
vue3.0 + vite + ts + elementplus
```

## 脚本解释
```
运行项目：npm run dev
打包项目：npm run build
```

## 组件全量打包
   1. 项目根目录下新建 command 文件夹
   2. 在 command 文件夹里新建 build.js 编写 vite 的打包配置
   3. 项目根目录下新建 packages 文件夹 主要是打包的入口文件夹
      1. 将 src/components/ 的所有文件和文件夹放入 packages 中
      2. 将使用的 hooks utils style 等相关的内容也放入 packages 中
      3. 修改 hooks utils style 等的引入路径
      4. 修改 packages 中的 index.ts 文件，引入 styles 样式
   4. 修改根目录下的 package.json , 配置执行打包的脚本
      ```
      "scripts": {
         "build:components": "node ./command/build.js",
         "lib": "npm run build:components"
      }
      说明：
         1、build:components 就是使用 node 执行 ./command/build.js 文件
         2、在命令行输入 npm run lib 的时候实际执行的是 build:components 即使用 node 执行 ./command/build.js 文件
      ```
   5. 在 packages 文件夹下新建 vue.d.ts 文件，并输入以下内容
      ```
         declare module '*.vue' {
            import { DefineComponent } from 'vue'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
            const component: DefineComponent<{}, {}, any>
            export default component
         }
      ```
   6. 在命令行输入 npm run lib 的时候要注意可能会报如下的错，解决方式之一：执行命令前，将 package.json 中的 "type": "module" 删除(注释)即可
      ```
         ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and '/Users/fremember/projectRootSource/fremember_github/vueDemos/v-elemplus/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///Users/fremember/projectRootSource/fremember_github/vueDemos/v-elemplus/command/build.js:1:14
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
      ```
   7. 单组件打包 需要安装 fs-extra
      ```
      npm install -D fs-extra
      ```
   8. 全局引入组件使用
      ```
         import localComponent from './../lib/f-components'
         import '../lib/style.css'

         const app = createApp(App)
         app.use(localComponent).mount('#app')
      ```
   9. 按需引入单组件
      ```
         import ChooseIcon from './../lib/ChooseIcon/index'
         import './../lib/ChooseIcon/style.css'

         const app = createApp(App)
         app.use(ChooseIcon).mount('#app')
      ```
   10. 打包发布 最终需要将打包后的 lib 文件夹发布到 npm
      1. 在 lib 文件夹下新建 package.json 文件
      2. 配置 package.json 文件
      3. 在 lib 文件夹下新建 index.d.ts 文件，并做配置
      4. 将 lib 文件夹下的 index.d.ts 文件 复制到每个组件文件夹下
      5. npm 官网登录账号
      6. 命令行 进入 lib 文件夹
      7. 输入 npm login 然后根据提示输入用户名和密码 登录npm账号
      8. 命令行执行 npm publish 发布
   11. 发布包的时候注意事项
      1. 用了淘宝镜像源 - 换成npm的源。
      2. 包名重复 - 删掉之前的包，改个名字。
      3. npm账户没有验证邮箱 - 验证邮箱。
      4. vpn冲突 - 关掉所有vpn再次尝试。
   12. 切换淘宝镜像与国外源
      1. 在cmd中查看当前镜像地址：npm get registry
      2. 切换为淘宝镜像：npm config set registry http://registry.npm.taobao.org/
      3. 切换为原本的npm镜像：npm config set registry https://registry.npmjs.org/
      4. 安装cnpm：npm install -g cnpm --registry=https://registry.npm.taobao.org
   13. 更新 发布的组件库
      1. 更新内容 修改 packages/index.ts 也可以是其他的
         ```
         import * as Icons from '@element-plus/icons-vue'
         import { toLine } from './utils'

         export default {
            install(app: App) {
               // 全局注册icon 牺牲性能
               for (let i in Icons) {
                     app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
               }
               components.map(item => {
                     app.use(item)
               })
            }
         }

         ```
      2. 修改 lib 下的 package.json (将 buildStaticFiles 中的 package.json 复制到 lib 中)
      3. 打包后的每个组件中加入 vue.d.ts 文件 (将 buildStaticFiles 中的 vue.d.ts 复制到 lib 和每个组件 中)
      4. 命令行 进入 lib 文件夹
      5. 命令行执行 npm publish 发布
   14. github部署项目预览 (注意：12～15是在github新建的 fremember/frememebr-components 的 Code 中的代码)
      1. 修改项目的路由模式为 hash 模式 
      2. 组件引入修改成本地引入
      3. 命令行打包项目 npm run build
      4. 将打包生成的 dist 文件夹部署到 github 
      5. 登录到 github ,找到自己的 repositories 然后 new
      6. 输入仓库名称、描述、选择public 然后点击 创建 按钮
      7. 将代码上传到github
      8. 将 dist 文件直接拖进终端
      9. git init 初始化一个git仓库
      10. git add . 将所有的文件添加进去
      11. git commit -m 提交信息，随便写
      12. git branch -M main
      13. git remote add origin https://github.com/fremember/frememebr-components.git
      14. git push -u origin main
      15. 上传成功后，在github新建的 fremember/frememebr-components 的 Settings 中 向下拉找到 GitHub Pages
      16. 点击 Check it out here!
      17. 在新开的页面中找到 Source 设置相关内容 选择分支 后点击 save 
      18. 复制生成的页面地址，打开即可
   15. 部署到码云 -- 步骤跟 14 一样，但是不执行 12 
      1. 第15步是在服务中找到 Gitee Pages
      2. 部署分支：master
      3. 可以启动 https
      4. 点击启动
      5. 复制生成的页面地址，打开即可

   16. 