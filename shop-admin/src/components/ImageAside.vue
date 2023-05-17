<template name="image-aside">
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <aside-list
                :active="activeId == item.id"
                v-for="item in list"
                :key="item.id"
                @edit="handleEdit(item)"
                @delete="handleDelete(item.id)"
                @click="handleChangeActiveId(item.id)"
            >{{ item.name }}</aside-list>
        </div>
        <div class="bottom">
            <el-pagination
                background 
                layout="prev, next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            ></el-pagination>
        </div>
    </el-aside>
    <form-drawer
        :title="drawerTitle"
        ref="formDrawerRef"
        @submit="handleSubmit"
    >
        <el-form
            :model="form"
            ref="formRef"
            :rules="rules"
            label-width="80px"
            :inline="false"
        >
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
        </el-form>
    </form-drawer>
</template>
<script setup>
    import { reactive, ref, computed } from 'vue'
    import FormDrawer from './FormDrawer.vue'
    import AsideList from './AsideList.vue'

    import { notification } from '@/utils/element-plus'

    import {
        getImageClassList,
        deleteImageClass,
        updateImageClass,
        createImageClass
    } from '@/api/image_class'

    let loading = ref(false),// 加载动画
        list = ref([]),
        currentPage = ref(1),// 分页
        total = ref(0),
        limit = ref(10);
    function getData (p = null) {// 初始化数据
        if(typeof p == 'number') {
            currentPage.value = p
        }
        loading.value = true
        getImageClassList(currentPage.value)
        .then(res => {
            total.value = res.totalCount
            list.value = res.list
            let item = list.value[0]
            if(item) {
                handleChangeActiveId(item.id)
            }
        })
        .finally(() => {
            loading.value = false
        })
    }
    getData()

    let editId = ref(0),
        formDrawerRef = ref(null),
        drawerTitle = computed(() => editId.value ? '修改' : '新增'),
        form = reactive({
            name: '',
            order: 0
        }),
        formRef = ref(null),
        rules = {
            name: [ { required: true, message: '图库分类名称不能为空', trigger: 'blur' } ]
        },
        handleSubmit = () => {
            formRef.value.validate(valid => {
                if(valid) {
                    formDrawerRef.value.showLoading()
                    const fn = editId.value ? updateImageClass(form) : createImageClass(form)
                    fn.then(() => {
                        notification({ message: `${drawerTitle.value}成功` })
                        getData(editId.value ? currentPage.value : 1)
                        formRef.value.close()
                    })
                    .finally(() => {
                        formDrawerRef.value.hideLoading()
                    })
                }
            })
        };

    const initFormData = (item) => {
            editId.value = item ? item.id : 0
            form.name = item ? item.name : ''
            form.order = item ? item.order : 0
            formDrawerRef.value.open()
        },
        handleCreate = () => {// 新增图片分类
            initFormData(null)
        },
        handleEdit = (item) => {// 编辑图片分类
            initFormData(item)
        },
        handleDelete = (id) => {// 删除图片分类
            loading.value = true
            deleteImageClass(id)
            .then(res => {
                notification({ message: '删除成功', type: 'success' })
                getData()
            })
            .finally(() => {
                loading.value = false
            })
        };

    let activeId = ref(0),
        emit = defineEmits(['change'])
    function handleChangeActiveId (id) {// 切换分类
        activeId.value = id
        emit('change', id)
    }
    
    defineExpose({
        handleCreate
    })
</script>
<style scoped>
    .image-aside {
        border-right: 1px solid #eeeeee;
        position: relative;
    }
    .image-aside .top {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 50px;
        overflow-y: auto;
    }
    .image-aside .bottom {
        position: absolute;
        bottom: 0;
        height: 50px;
        left: 0;
        right: 0;
        @apply flex items-center justify-center;
    }
</style>