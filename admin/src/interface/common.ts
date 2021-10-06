/*
 * @Author: fremember
 * @Date: 2021-09-15 17:49:55
 * @Description: 接口
 */

import { Commit, Dispatch } from 'vuex'

export interface ActionContext {
    commit: Commit;
    dispatch: Dispatch;
}
export interface LoginForm {
    username: string;
    userpwd: string;
    verificationCode: string;
}