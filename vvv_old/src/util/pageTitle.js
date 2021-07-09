/*
 * @Author: fremember
 * @Date: 2021-06-16 11:33:14
 * @Description: 设置页面标题
 */
import commonSettings from '@/config'
let { title, titleReverse, titleSeparator } = commonSettings

export default function getPageTitle (pageTitle) {
    let newTitles = []
    pageTitle && newTitles.push(pageTitle)
    title && newTitles.push(title)
    if (titleReverse) {
        newTitles = newTitles.reverse()
    }
    return newTitles.join(titleSeparator)
}