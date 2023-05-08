<!--
 * @Author: fremember
 * @Date: 2021-09-26 09:14:58
 * @Description: 首页
-->
<template>
    <div class="dashboard">
        <a-button type="primary" @click="showModal">添加</a-button>
        <a-modal v-model:visible="visible" :footer="null" title="添加菜单">
            <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item ref="name" label="菜单名称" name="name">
                    <a-input v-model:value="formState.name" placeholder="请输入菜单名称" />
                </a-form-item>
                <a-form-item label="上级菜单">
                    <a-select v-model:value="formState.parent" placeholder="请选择上级菜单">
                        <a-select-option value="">无上级菜单</a-select-option>
                        <a-select-option v-for="route in topRoutes" :value="route.name" :key="route.name">{{ route.title }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="前端名称" name="title">
                    <a-input v-model:value="formState.title" placeholder="请输入前端名称" />
                </a-form-item>
                <a-form-item label="前端图标" name="icon">
                    <a-input v-model:value="formState.icon" placeholder="请输入前端图标" />
                </a-form-item>
                <a-form-item label="是否显示">
                    <a-radio-group v-model:value="formState.showFlag">
                        <a-radio :value="true">是</a-radio>
                        <a-radio :value="false">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="是否缓存" name="catch">
                    <a-radio-group v-model:value="formState.catch">
                        <a-radio :value="true">是</a-radio>
                        <a-radio :value="false">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="排序" name="order">
                    <a-input v-model:value="formState.order" disabled placeholder="设置排序" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
                    <a-button type="primary" @click="onSubmit">提交</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue'
    import { useStore } from 'vuex'
    import router from '@/router'

    import { TopRoutes } from '@/interface/common'

    interface FormState {
        name: string;// 路由地址
        parent: string;// 上级的name参数
        title: string;// 前端显示的文字
        icon: string;// 图标
        showFlag: boolean;// 是否显示，false：否，true：是
        rolename: string;// 角色名称
        catch: boolean; // 是否缓存，false：否，true：是
        order: number;// 排序
    }

    export default defineComponent({
        name: 'Dashboard',
        setup () {
            let store = useStore(),
                visible = ref<boolean>(false),
                formRef = ref<any>(null),
                topRoutes = computed(() => store.getters['routes/topRoutes']),
                formState = reactive<FormState>({
                    name: '',
                    parent: '',
                    title: '',
                    icon: '',
                    showFlag: true,
                    rolename: '',
                    catch: true,
                    order: 1
                }),
                rules = ref<any>({
                    name: [
                        { required: true, message: '菜单名称不能为空', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '前端名称不能为空', trigger: 'blur' },
                    ],
                    icon: [
                        { required: true, message: '前端图标不能为空', trigger: 'blur' },
                    ],
                }),
                showModal = (): void => {
                    visible.value = !visible.value
                },
                onSubmit = (): void => {
                    // console.log(formState)
                    formRef.value.validate()
                        .then(async () => {
                            let res = await store.dispatch('routes/addRoute', formState)
                            console.log(res)
                        })
                        .catch((err: any): void => {
                            console.log(err)
                        })
                    // addRoute
                },
                resetForm = (): void => {
                    formRef.value.resetFields()
                };
            onMounted(() => {
                store.dispatch('routes/setTopRoutes')
            })
            watch(
                () => topRoutes.value,
                (newVal: Array<TopRoutes>): void => {
                    if(newVal.length > 0) {
                        formState.order = Number(newVal[newVal.length - 2].order) + 1 < 10 ? Number(newVal[newVal.length - 2].order) + 1 : Number(newVal[newVal.length - 1].order) + 1
                    }
                }
            )
            return {
                visible,
                formRef,
                formState,
                rules,
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
                topRoutes,

                showModal,
                onSubmit,
                resetForm,
            }
        }
    })
</script>
<style scoped lang="stylus">
    @import './../../assets/stylus/reset'
    .mine-swiper {
        margin-auto(50px)
        width(800px)
        height(600px)
        border: 1px solid #aaa
        overflow: hidden

        .swiper-slide {
            width(800px)
            height(600px)
            font-size(30px)
            background(pink)
        }

    }
</style>