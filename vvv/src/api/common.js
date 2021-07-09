/*
 * @Author: fremember
 * @Date: 2021-06-16 19:45:59
 * @Description: 
 */
import service from '@/util/request'

// 获取图形验证码
export function getImgVerify (data) {
    return service.post('/api/common/getImgVerify', data)
}
// 获取用户的技能列表
export function getSkills () {
    return service.get('/api/common/getSkills')
}