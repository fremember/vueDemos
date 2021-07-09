/*
 * @Author: fremember
 * @Date: 2021-05-06 14:32:23
 * @Description: 状态管理总接口
 */
import { Commit, Dispatch } from 'vuex'


// 各个module里面actions使用的类型
export interface ActionContext {
    commit: Commit,
    dispatch: Dispatch
}
interface metaInterface {
    query: string;
    catch: boolean;
}
export interface UrlItem {
    url: string;// 路由体
    fullPath: string;// 完整路由
    title: string;// 路由对应的中文名字
    meta: metaInterface;
}
