<!--
 * @Author: fremember
 * @Date: 2021-05-13 18:06:34
 * @Description: 登录页面
-->
<template>
    <section class="login">
        <div class="pos-f pos-center bgfff content">
            <header class="tac title">方田教育教务管理系统</header>
            <a-form :ref="loginRef" :model="loginForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item name="username">
                    <a-input v-model:value="loginForm.username" placeholder="请输入用户名">
                        <template v-slot:prefix>
							<UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password">
                    <a-input-password v-model:value="loginForm.password" placeholder="请输入密码">
                        <template v-slot:prefix>
							<LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
                    </a-input-password>
                </a-form-item>
                <a-form-item class="pos-r captcha-wrapper" name="captcha">
                    <a-input v-model:value="loginForm.captcha" placeholder="请输入验证码" />
                    <img class="pos-a captcha-img" src="@/assets/imgs/logo.png" alt="">
                </a-form-item>
                <a-form-item class="mb0">
                    <a-button class="colorfff" type="primary" @click="loginEvent">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </section>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent, UnwrapRef, onMounted } from 'vue'
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
    import { LoginForm } from './../../interface/login'
    import { LoginService } from './../../api/login'
    const login = new LoginService()
    export default defineComponent({
        name: 'Login',
        components: { UserOutlined, LockOutlined },
        setup () {
            let loginForm: UnwrapRef<LoginForm> = reactive({
                    username: '',
                    password: '',
                    captcha: ''
                }),
                // eslint-disable-next-line
                usernameCheck = async (rule: any, value: any, callback: any): Promise<any> => {
                    if(!value) {
                        return Promise.reject('手机号不能为空')
                    } else if(!/^1[3456789]\d{9}$/.test(value)) {
                        return Promise.reject('手机号格式不正确')
                    } else {
                        return Promise.resolve()
                    }
                },
                rules = {
                    username: [
                        { validator: usernameCheck, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    captcha: [
                        { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ]
                },
                ruleFormRef = ref(null),
                loginRef = (el: any): void => {
                    ruleFormRef.value = el
                },
                loginEvent = () => {
                    let _ruleFormRef: any = ruleFormRef
                    _ruleFormRef.validate()
                    .then(() => {
                        let data = { ...loginForm }
                        console.log(data)
                    })
                };
            onMounted(() => {
                login.captcha()
            })
            return {
                loginForm,
                rules,
                loginRef,
                loginEvent
            }
        }
    })
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
    .login {
        width(100%)
        height(100vh)
        background(url('./../../assets/imgs/loginbg.png') no-repeat)
        background-size: 100% 100%
        .content {
            padding-all(20px)
            width(300px)
            box-shadow: 0 0 50px #209ee4
            border-radius(5px)
            .title {
                margin-bottom(20px)
                font-size(18px)
                font-color(#209ee4)
                font-weight(bolder)
            }
        }
    }
</style>