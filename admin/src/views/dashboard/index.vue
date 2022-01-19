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
                        <a-select-option value="1">商品</a-select-option>
                        <a-select-option value="2">订单</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="前端名称" name="title">
                    <a-input v-model:value="formState.title" placeholder="请输入前端名称" />
                </a-form-item>
                <a-form-item label="前端图标" name="icon">
                    <a-input v-model:value="formState.icon" placeholder="请输入前端图标" />
                </a-form-item>
                <!-- <a-form-item label="是否显示" name="showFlag">
                    <a-radio-group v-model:value="formState.showFlag">
                        <a-radio value="0">是</a-radio>
                        <a-radio value="1">否</a-radio>
                    </a-radio-group>
                </a-form-item> -->
                <a-form-item label="是否缓存" name="catch">
                    <a-radio-group v-model:value="formState.catch">
                        <a-radio value="0">是</a-radio>
                        <a-radio value="1">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="排序" name="sort">
                    <a-input v-model:value="formState.sort" disabled placeholder="设置排序" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
                    <a-button type="primary" @click="onSubmit">提交</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </a-modal>

        <div class="mine-swiper">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="list in swiperList" :key="list.id">
                        <div v-for="item in list.lists" :key="item.id" @click="swiperItemEvent(item)">
                            {{ item.desc }}
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination" slot="pagination"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, reactive, onMounted } from 'vue'
    import router from '@/router'

    import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js'
    
 
    import SwiperCore, { Pagination, Autoplay } from 'swiper'
    SwiperCore.use([ Pagination, Autoplay ])

    interface SwiperItem {
        id: string;
        desc: string
    }
    interface SwiperLists {
        id: string;
        lists: Array<SwiperItem>
    }


    interface FormState {
        name: string;// 路由地址
        parent: string;// 上级的name参数
        title: string;// 前端显示的文字
        icon: string;// 图标
        rolename: string;// 角色名称
        catch: string; // 是否缓存，0: false 1: true
        sort: number;// 排序
    }

    export default defineComponent({
        name: 'Dashboard',
        components: {
            Swiper,
            SwiperSlide,
        },
        setup () {
            let visible = ref<boolean>(false),
                formRef = ref<any>(null),
                formState = reactive<FormState>({
                    name: '',
                    parent: '',
                    title: '',
                    icon: '',
                    rolename: '',
                    catch: '0',
                    sort: 1
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
                swiperList = reactive<Array<SwiperLists>>([
                    {
                        id: 'aaa',
                        lists: [
                            {
                                id: 'a1',
                                desc: "背景图第一张"
                            },
                            {
                                id: 'a2',
                                desc: "背景图第二张"
                            },
                            {
                                id: 'a3',
                                desc: "背景图第三张"
                            },
                            {
                                id: 'a4',
                                desc: "背景图第4张"
                            }
                        ]
                    },
                    {
                        id: 'bbb',
                        lists: [
                            {
                                id: 'b1',
                                desc: "背景图第一张"
                            },
                            {
                                id: 'b2',
                                desc: "背景图第二张"
                            },
                            {
                                id: 'b3',
                                desc: "背景图第三张"
                            }
                        ]
                    },
                    {
                        id: 'ccc',
                        lists: [
                            {
                                id: 'c1',
                                desc: "背景图第一张"
                            },
                            {
                                id: 'c2',
                                desc: "背景图第二张"
                            },
                            {
                                id: 'c3',
                                desc: "背景图第三张"
                            }
                        ]
                    }
                ]),
                showModal = (): void => {
                    visible.value = !visible.value
                },
                onSubmit = (): void => {},
                resetForm = (): void => {
                    formRef.value.resetFields()
                },
                swiperItemEvent = (item: SwiperItem): void => {
                    router.push('/error/404')
                };
            onMounted(() => {
                new SwiperCore(".swiper-container", {
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    }
                });
            })
            return {
                visible,
                formRef,
                formState,
                rules,
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },

                swiperList,


                showModal,
                onSubmit,
                resetForm,
                swiperItemEvent
            }
        }
    })
</script>
<style scoprd lang="stylus">
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