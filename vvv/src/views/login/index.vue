<!--
 * @Author: fremember
 * @Date: 2021-06-15 10:26:30
 * @Description: 登录
-->
<template>
    <div class="flex ai-c jc-c login">
        <div class="log-reg-for-content bgfff l-content">
            <p class="l-title">Login</p>
            <p class="more-info">开启vue3.0+antd体验的第一站</p>
            <a-form :ref="ruleForm" :model="form" :rules="rules">
                <a-form-item name="username">
                    <a-input v-model:value="form.username" placeholder="请输入用户名">
                        <template v-slot:prefix>
                            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="userpwd">
                    <a-input-password v-model:value="form.userpwd" placeholder="请输入密码">
                        <template v-slot:prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item name="verificationCode">
                    <verification-code v-model:value="form.verificationCode" @callback="callback"></verification-code>
                    <p class="flex ai-c jc-e pos-a r0 pt4px">
                        <router-link class="cur-p forget" to="/forget">忘记密码</router-link>
                    </p>
                </a-form-item>
                <a-form-item class="mt50px mb0px">
                    <a-row>
                        <a-col :span="16">
                            <a-button type="primary" @click="onSubmit" :loading="loading">登录</a-button>
                        </a-col>
                        <a-col :span="7" :offset="1">
                            <a-button>
                                <router-link to="/register">注册</router-link>
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { ref, reactive, computed } from 'vue'
    import { useStore }  from 'vuex'
    
    import { md5 } from 'utility'
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
    import VerificationCode from '@/components/verificationCode/index'
    export default {
        name: 'Login',
        components: { UserOutlined,  LockOutlined, VerificationCode },
        setup () {
            let store = useStore(),
                form = ref({
					username: '',
					userpwd: '',
					verificationCode: ''
				}),
				ruleFormRef = null,
                ruleForm = el => {
                    ruleFormRef = el
                },
                ajaxResult = ref(null),
                // eslint-disable-next-line
                usernameCheck = async (rule, value, callback) => {
                    if(!value) {
                        return Promise.reject('用户名不能为空')
                    } else {
                        return Promise.resolve()
                    }
                },
                // eslint-disable-next-line
                userpwdCheck = async (rule, value, callback) => {
                    if(value.length == 0) {
                        return Promise.reject('密码不能为空')
                    } else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/.test(value)) {
                        return Promise.reject('密码必须由数字+字母+特殊字符组合，长度介于6~16位')
                    } else {
                        return Promise.resolve()
                    }
                },
                rules = ref({
                    username: [
                        { validator: usernameCheck, trigger: 'blur' }
                    ],
                    userpwd: [
                        { validator: userpwdCheck, trigger: 'blur' }
                    ],
                    verificationCode: [
                        { required: true, message: '验证码不能为空', trigger: 'change' }
                    ]
                }),
                callback = (data) => {
                    form.value.verificationCode = data
                },
                
                loading = computed(() => store.getters['common/loading']),
                onSubmit = () => {
                    ruleFormRef.validate()
                    .then(() => {
                        let data = { ...form.value }
                        data.userpwd = md5(data.userpwd)
                        store.dispatch('user/login', data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                };
            return {
                form,
                rules,
                ruleForm,
                loading,
                callback,
                onSubmit
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
    .login {
        height(100vh)
        .l-content {
            .l-title {
                font-size(20px)
            }
            .ant-input-affix-wrapper {
                padding-t-b(8px)
                padding-l-r(11px)
            }
            .ant-btn {
                width(100%)
                height(40px)
            }
            .forget {
                font-color(#1890ff)
                &:hover {
                    font-color(#40a9ff)
                }
            }
        }
    }
</style>