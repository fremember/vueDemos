## 问题1: vue使用defineProps定义属性的时候，不能引入外部文件的类型，如何解决？
```
    1、安装 vue macros ，执行：npm i -D unplugin-vue-macros
    2、配置 vite.config.ts 
```

## 当组件不命名的时候，会有一个红色的波浪线，如何解决？
```
    在 .eslintrc.cjs 文件中添加如下代码
    rules: {
        'vue/multi-word-component-names': 0
    }
```