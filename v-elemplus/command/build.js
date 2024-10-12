// 打包配置文件

const path = require('path'),
    { defineConfig, build } = require('vite'),
    vue = require('@vitejs/plugin-vue'),
    vueJsx = require('@vitejs/plugin-vue-jsx'),
    fsExtra = require('fs-extra'),
    fs = require('fs');

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')

// 出口文件夹
const outDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()]
})

// rollup 配置
const rollupOptions = {
    external: ['vue', 'vue-router'],
    output: {
        globals: {
            vue: 'Vue'
        }
    }
}

// 全量打包配制方法
const buildAll = async () => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, 'index.ts'),
                name: 'f-components',
                fileName: 'f-components',
                formats: ['es', 'umd']
            },
            outDir
        }
    })
}

// 单组件打包 第一步
// name 组件名称
const buildSingle = async (name) => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, name),
                name: 'index',
                fileName: 'index',
                formats: ['es', 'umd']
            },
            outDir: path.resolve(outDir, name)
        }
    })
}

// 单组件打包 第二步 每个组生成 package.json
const createPackageJson = (name) => {
    const fileStr = `
        {
            "name": "${name}",
            "main": "index.umd.js",
            "module": "index.css.js",
            "style": "styles.css"
        }
    `
    fsExtra.outputFile(
        path.resolve(outDir, `${name}/package.json`),
        fileStr,
        'utf-8'
    )
}

// 打包成库
const buildLib = async () => {
    await buildAll()
    // 单组件打包 第三步
    // 获取组件名称组成的数组
    const components = fs.readdirSync(entryDir).filter(name => {
        const componentDir = path.resolve(entryDir, name),
            isDir = fs.lstatSync(componentDir).isDirectory();
        return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    // 循环构建
    for (const name of components) {
        await buildSingle(name)
        createPackageJson(name)
    }
}

buildLib()