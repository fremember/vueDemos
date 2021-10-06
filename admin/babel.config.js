/*
 * @Author: fremember
 * @Date: 2021-09-15 14:31:52
 * @Description: 
 */
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            "import",
            {
                "libraryName": "ant-design-vue",
                "libraryDirectory": "es",
                "style": "css"// `style: true` 会加载 less 文件
            }
        ]
    ]
}
