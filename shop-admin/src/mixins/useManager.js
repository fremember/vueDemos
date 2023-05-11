import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { logout } from '@/api/manager'
import { notification, showModel } from '@/utils/element-plus'

export function useRepassword () {// 修改密码相关逻辑
    const store = useStore(),
        router = useRouter(),
        formDrawerRef = ref(null),
        form = reactive({
            oldpassword: '',
            password: '',
            repassword: ''
        }),
        rules = {
            oldpassword: [
                { required: true, message: '旧密码不能为空', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '新密码不能为空', trigger: 'blur' },
            ],
            repassword: [
                { required: true, message: '确认密码不能为空', trigger: 'blur' },
            ]
        },
        formRef = ref(null),
        onSubmit = () => {
            formRef.value.validate(valid => {
                if(!valid) {
                    return false
                }
                formDrawerRef.value.showLoading()
                store.dispatch('manager/updatePassword', form).then(() => {
                    notification({ message: '修改密码成功，请重新登录', type: 'success' })
                    router.push({ name: 'login-view' })
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
            })
        },
        openRePasswordForm = () => formDrawerRef.value.open();
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}

export function useLogout() {// 退出登录相关逻辑
    const store = useStore(),
        router = useRouter();
    function handleLogout () {
        showModel({ context: '是否要确定退出登录' }).then(() => {
            store.dispatch('manager/logout').then(() => {
                router.push({ name: 'login-view' })
                notification({ message: '退出成功', type: 'success' })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return {
        handleLogout
    }
}