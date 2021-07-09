/*
 * @Author: fremember
 * @Date: 2021-06-16 08:34:09
 * @Description: 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */
import defaultSetting from './default'// 默认配置
import config from './config'// 自定义配置
const commonSettings = { ...defaultSetting, config }
export default commonSettings