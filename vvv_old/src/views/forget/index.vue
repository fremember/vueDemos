<!--
 * @Author: fremember
 * @Date: 2021-06-22 10:22:03
 * @Description: 忘记密码
-->
<template>
    <section class="flex ai-c jc-c forget">
        <div class="log-reg-for-content f-content">
            <p class="tac title">{{ title }}</p>
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
                <a-form-item name="userpwd2">
                    <a-input-password v-model:value="form.userpwd2" placeholder="请再次输入密码">
                        <template v-slot:prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item name="verificationCode">
                    <verification-code v-model:value="form.verificationCode" @callback="callback"></verification-code>
                </a-form-item>
                 <a-form-item class="mt50px mb0px">
                    <a-row>
                        <a-col :span="16">
                            <a-button type="primary" @click="onSubmit" :loading="loading">确认</a-button>
                        </a-col>
                        <a-col :span="7" :offset="1">
                            <a-button @click="goback">取消</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>

                
            </a-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { ref, computed, getCurrentInstance, watch } from 'vue'
    import { useStore }  from "vuex"
    import { useRouter } from 'vue-router'
    import { md5 } from 'utility'
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
    import VerificationCode from '@/components/verificationCode/index'
    export default {
        // name: 'Forget',
        components: { UserOutlined,  LockOutlined, VerificationCode },
        setup () {
            let { proxy } = getCurrentInstance(),
                store = useStore(),
                router = useRouter(),
                loading = computed(() => store.getters['common/loading']),
                ruleFormRef = null,
                ruleForm = el => {
                    ruleFormRef = el
                },
                title = ref(''),
                form = ref({
                    username: '',
                    userpwd: '',
                    userpwd2: '',
                    verificationCode: ''
                }),
                usernameCheck = async (rule, value, callback) => {
                    if(!value) {
                        return Promise.reject('用户名不能为空')
                    // } else if (!/^1[3456789]\d{9}$/.test(value)) {
                    //     return Promise.reject('手机号格式不正确')
                    } else {
                        return Promise.resolve()
                    }
                },
                userpwdCheck = async (rule, value, callback) => {
                    if(value.length == 0) {
                        return Promise.reject('密码不能为空')
                    } else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/.test(value)) {
                        return Promise.reject('密码必须由数字+字母+特殊字符组合，长度介于6~16位')
                    } else if(form.value.userpwd2 && form.value.userpwd2 != form.value.userpwd) {
                        return Promise.reject('两次密码不一致')
                    } else {
                        return Promise.resolve()
                    }
                },
                userpwdCheck2 = async (rule, value, callback) => {
                    if(value.length == 0) {
                        return Promise.reject('密码不能为空')
                    } else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/.test(value)) {
                        return Promise.reject('密码必须由数字+字母+特殊字符组合，长度介于6~16位')
                    } else if(form.value.userpwd && form.value.userpwd2 != form.value.userpwd) {
                        return Promise.reject('两次密码不一致')
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
                    userpwd2: [
                        { validator: userpwdCheck2, trigger: 'blur' }
                    ],
                    verificationCode: [
                        { required: true, message: '验证码不能为空', trigger: 'change' }
                    ]
                }),
                callback = (data) => {
                    form.value.verificationCode = data
                },
                goback = () => {
                    router.go(-1)
                },
                onSubmit = () => {
                   ruleFormRef.validate()
                    .then(() => {
                        let data = { ...form.value }
                        data.userpwd = md5(data.userpwd)
                        delete data.userpwd2
                        data.type = title.value == '修改密码' ? 1 : 0
                        store.dispatch('user/updatePwd', data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                };
            watch(() => proxy.$router.currentRoute.value, (nRoute) => {
                title.value = nRoute.fullPath == '/modify' ? '修改密码' : '重置密码'

            }, {
                immediate: true// 立即监听路由变化
            })
            return {
                title,
                ruleForm,
                form,
                rules,
                loading,
                callback,
                goback,
                onSubmit
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
    .forget {
        height(100vh)
        .f-content {
            p {
                margin-bottom(20px)
                &.title {
                    font-size(20px)
                }
            }
            .ant-input-affix-wrapper {
                padding-t-b(8px)
                padding-l-r(11px)
            }
            .ant-btn {
                width(100%)
                height(40px)
            }
        }
    }
</style>