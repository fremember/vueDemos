<!--
 * @Author: fremember
 * @Date: 2021-09-15 17:13:02
 * @Description: 登录页面
-->
<template>
    <div class="login">
        <div class="pos-a login-wrapper">
            <h2 class="tac login-wrapper-title">后台管理系统</h2>
            <a-form :ref="ruleForm" :model="formData" :rules="rules" class="login-wrapper-content">

                <a-form-item :validate-status="formItemStatus.nameStatus" has-feedback name="username">
                    <a-input v-model:value="formData.username" allow-clear placeholder="用户名">
                        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                    </a-input>
                </a-form-item>

                <a-form-item :validate-status="formItemStatus.pwdStatus" has-feedback name="userpwd">
                    <a-input-password v-model:value="formData.userpwd" allow-clear placeholder="请输入密码">
                        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                    </a-input-password>
                </a-form-item>

                <div class="flex ai-s">
                    <a-form-item has-feedback class="flex_1 login-wrapper-content-input" name="verificationCode">
                        <a-input v-model:value="formData.verificationCode" allow-clear placeholder="请输入验证码">
                            <template #prefix><KeyOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                    </a-form-item>
                    <validate-code class="ml8px" />
                </div>

                <ul class="flex ai-c jc-s mb40px login-wrapper-content-btns">
                    <li class="cur-p">
                        <a-checkbox @change="rememberPwd">记住密码</a-checkbox>
                    </li>
                    <li class="cur-p">
                        <router-link to="/forget">忘记密码</router-link>
                    </li>
                </ul>
                <a-button class="w100" type="primary" :loading="loading" @click="loginEvent">登录</a-button>
            </a-form>
        </div>
        <copy-right />
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, ref, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { md5 } from 'utility'

    import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons-vue'
    import ValidateCode from '@/components/validateCode/index.vue'
    import CopyRight from '@/components/copyRight/index.vue'

    import { LoginForm } from '@/interface/user'

    export default defineComponent({
        name: 'Login',
        components: { UserOutlined,  LockOutlined, KeyOutlined, CopyRight, ValidateCode },
        setup () {
            let store = useStore(),// 使用vuex
                loading = computed(() => store.getters['common/loading']),// 标识按钮状态loading
                rememberPwdFlag = ref(false),// 记住密码状态标识
                ruleFormRef: any = null,// 验证使用的表单元素
                ruleForm = (el: any): void => {// 表单元素
                    ruleFormRef = el
                },
                formItemStatus = reactive({// 表单元素状态
                    nameStatus: '',
                    pwdStatus: '',
                    verificationCode: ''
                }),
                formData = reactive({// 表单数据
                    username: '',
                    userpwd: '',
                    verificationCode: ''
                }),
                usernameCheck = async (rule: any, value: any, callback: any): Promise<any> => {// 用户名校验
                    if(!value) {
                        formItemStatus.nameStatus = 'error'
                        return Promise.reject('用户名不能为空')
                    } else {
                        return Promise.resolve()
                    }
                },
                userpwdCheck = async (rule: any, value: any, callback: any): Promise<any> => {// 密码校验
                    if(value.length == 0) {
                        formItemStatus.pwdStatus = 'error'
                        return Promise.reject('密码不能为空')
                    } else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/.test(value)) {
                        formItemStatus.pwdStatus = 'error'
                        return Promise.reject('密码必须由数字+字母+特殊字符组合，长度介于6~16位')
                    } else {
                        return Promise.resolve()
                    }
                },
                rules = ref({// 具体的校验规则
                    username: [
                        { validator: usernameCheck, trigger: 'blur' }
                    ],
                    userpwd: [
                        { validator: userpwdCheck, trigger: 'blur' }
                    ],
                    verificationCode: [
                        { required: true, message: '验证码不能为空' }
                    ]
                }),
                rememberPwd = (e: any): void => {// 修改记住密码状态
                    rememberPwdFlag.value = e.target.checked
                },
                loginEvent = (): void => {// 登录事件
                    ruleFormRef.validate()
                        .then(() => {
                            if(rememberPwdFlag.value) {// 具体记住密码逻辑
                                console.log(rememberPwdFlag.value)
                            }
                            let data: LoginForm = { ...formData }
                            data.userpwd = md5(data.userpwd)
                            store.dispatch('common/login', data)
                        })
                        .catch((err: any): void => {
                            console.log(err)
                        })
                };
            return {
                loading,
                ruleForm,
                formItemStatus,
                formData,
                rules,
                rememberPwd,
                loginEvent
            }
        }
    })
</script>
<style scoped lang="stylus">
    @import './../../assets/stylus/reset'
    .login {
        width(100vw)
        height(100vh)
        background(#2096bc)
        &-wrapper {
            top(50%)
            left(0%)
            transform: translateY(-50%)
            width(100%)
            &-title {
                padding-t-b(20px)
                font-size(50px)
                font-color(#fff)
                letter-spacing: 10px
                text-shadow: 4px 5px 8px #333
            }
            &-content {
                margin-auto(0)
                padding-all(30px)
                width(25%)
                min-width: 360px
                background(#eaf4f659)
                border-radius(8px)
                input {
                    height(30px)
                }
                &-input {
                    .ant-form-item-control-input-content {
                        display(flex)
                        .ant-input-affix-wrapper {
                            height(40px)
                            &:before {
                                height(30px)
                            }
                            .ant-input-prefix,
                            .ant-input-suffix {
                                height(30px)
                            }
                        }
                    }
                }
                &-btns {
                    transition: all .3s ease-in-out
                    li{
                        font-color(#ccc)
                        a, .ant-checkbox-wrapper {
                            font-color(#ccc)
                        }
                        &:hover {
                            font-color(#fff)
                            a, .ant-checkbox-wrapper {
                                font-color(#fff)
                            }
                        }
                    }
                }
            }
        }
    }
</style>