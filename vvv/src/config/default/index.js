/*
 * @Author: fremember
 * @Date: 2021-06-16 08:40:14
 * @Description: 导出默认配置（通用配置、主题配置、网络配置）
 */
import setting from './setting.config'
import theme from './theme.config'
import network from './net.config'

const defaultSetting = { ...setting, ...theme, ...network }
export default defaultSetting