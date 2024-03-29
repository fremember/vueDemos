# 招聘项目

## 项目搭建及准备工作
```
1、创建项目： npm init vite 
2、输入项目名称后，选择vue + typescript
3、进入项目，安装依赖，npm install
4、执行：npm run dev
5、集成pinia：npm install pinia --save
6、集成vueUse：npm install @vueuse/core --save
7、集成vant：npm install vant --save
8、集成vue-router：npm install vue-router@4 --save
9、集成path：npm install path --save
10、集成axios：npm install axios --save
11、集成 Windicss：npm i -D vite-plugin-windicss windicss
```

```
为什么选择pinia?
pinia也是个状态管理的插件
优点：
   1、简便，存储和组件变得很类似
   2、类型安全，通过类型推断可以提供自动完成的功能
   3、vue-devtools支持，方便调试
   4、支持扩展，可以通过本地存储、事务等进行扩展
   5、模块化设计，通过构建多个存储模块，可以让程序员自动拆分
   6、非常轻巧
   7、服务器端渲染支持
与vuex的比较：
   1、更简单的api，具有更少的操作，提供了 Composition API 风格的api
   2、与typescript一起使用时有类型支持
```

### api接口文档地址
https://console-docs.apipost.cn/preview/3b59c56f0685a681/5919fa750c084f4c

### ui设计用这个地址，如果不能查看尺寸可以加群在群里说给添加
https://lanhuapp.com/link/#/invite?sid=lX0sjRuA

### 静态资源
assets
   img                                 // 图片资源
      icon                            // icon图标类图片
   css                                 // 样式资源
      style.css                       // 公用样式

### 项目公共组件
components
   list                                // 列表文件
      TaskList.vue                    // 任务列表组件
      ContractList.vue                // 合约列表组件
      MessageList.vue                 // 消息列表组件
      TalentList.vue                  // 人才列表组件
   FooterTabbar.vue                    // 底部导航组件

### api接口
api
   user.ts                             // 登录模块api
   task.ts                             // 任务模块api
   contract.ts                         // 合约模块api
   message.ts                          // 消息模块api
   my.ts                               // 我的模块api
   talent.ts                           // 人才模块api
### 路由
router 
   index.ts                            // 路由管理主页

### 项目页面结构
views
   login
      index.vue                       // 登录页
      serviceAgree.vue                // 服务协议
      privacyPolicy.vue               // 隐私政策
   task
      index.vue                       // 任务主页
      search.vue                      // 任务搜索
      details.vue                     // 任务详情
      companySource.vue               // 公司任务主页
   contract
      index.vue                       // 合约主页
      details.vue                     // 合约详情
      progress.vue                    // 合约进度
   message
      index.vue                       // 消息主页
      systemList.vue                  // 系统消息列表
      systemDetails.vue               // 系统消息详情
      talk.vue                        // 对话消息
   my
      index.vue                       // 我的主页
      user                            // 用户中心
         index.vue                   // 个人信息主页
         authReal.vue                // 实名认证
         certified.vue               // 已完成实名认证
         identitySwitch.vue          // 切换身份
      set                             // 我的设置
         index.vue                   // 设置主页
      feedback                        // 意见反馈
         index.vue                   // 反馈主页
      account                         // 我的账户
         index.vue                   // 账户主页
         advance.vue                 // 账户提现
         coinExplain.vue             // 无忧币说明
         depositExplain.vue          // 押金说明
      resume                          // 我的简历
         index.vue                   // 简历主页
         preview.vue                 // 简历预览
      collect                         // 我的收藏
         index.vue                   // 收藏主页
   talent
      index.vue                       // 人才主页
      details.vue                     // 人才详情