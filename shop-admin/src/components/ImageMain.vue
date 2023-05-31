<template name="image-main">
    <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="item in list" :key="item.id">
                    <el-card
                        shadow="hover"
                        class="relative mb-3"
                        :body-style="{'padding': 0}"
                        :class="{'border-blue-500': item.checked}"
                    >
                        <el-image
                            :src="item.url"
                            fit="cover"
                            class="h-[150px]"
                            style="width: 100%"
                            :preview-src-list="[item.url]"
                            :initial-index="0"
                        ></el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">
                            <el-checkbox
                                v-if="openChoose"
                                v-model="item.checked"
                                @change="handleChooseChange(item)"
                            ></el-checkbox>
                            <el-button type="primary" size="small" text @click="handleEdit(item)">重命名</el-button>
                            <el-popconfirm
                                title="是否删除该图片"
                                confirmButtonText="确认"
                                cancelButtonText="取消"
                                @confirm="handleDelete(item.id)"
                            >
                                <template #reference>
                                    <el-button class="!m-0" type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            />
        </div>
    </el-main>
    <el-drawer v-model="drawer" title="上传图片">
        <upload-file :data="{ image_class_id }" @success="handleUploadSuccess" />
    </el-drawer>
</template>
<script setup>
    import { ref, computed } from 'vue'
    
    import { showPrompt, notification, showModel } from '@/utils/element-plus'
    import {
        getImageList,
        updateImage,
        deleteImage
    } from '@/api/image'

    import UploadFile from './UploadFile.vue'

    let loading = ref(false),// 分页
        currentPage = ref(1),
        total = ref(0),
        limit = ref(10),
        list = ref([]),
        image_class_id = ref(0),
        drawer = ref(false),// 上传图片
        openUploadFile = () => drawer.value = true;
    const  props = defineProps({
            openChoose:{
                type:Boolean,
                default:false
            },
            limit:{
                type:Number,
                default:1
            }
        }),
        // 选中的图片
        emit = defineEmits(['choose']);
    const getData = (p = null) => {// 初始化数据列表
            if(typeof p == 'number') {
                currentPage.value = p
            }
            loading.value = true
            getImageList(image_class_id.value, currentPage.value)
            .then(res => {
                total.value = res.totalCount
                list.value = res.list.map(o => {
                    o.checked = false
                    return o
                })
            })
            .finally(() => {
                loading.value = false
            })
        },
        loadData = (id) => {// 根据分类ID重新加载图片列表
            currentPage.value = 1
            image_class_id.value = id
            getData()
        },
        handleChooseChange = (item) => {
            if(item.checked && checkedImage.value.length > props.limit){
                item.checked = false
                return toast(`最多只能选中${props.limit}张`, "error")
            }
            emit('choose', checkedImage.value)
        },
        handleEdit = (item) => {// 重命名
            showPrompt('重命名', item.name)
            .then(({ value }) => {
                loading.value = true
                updateImage(item.id, value)
                .then(() => {
                    notification({ message: '修改成功' })
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
            })
        },
        handleDelete = (id) => {// 删除图片
            loading.value = true
            deleteImage([id])
            .then(() => {
                notification({ message: '删除成功' })
                getData()
            })
            .finally(() => {
                loading.value = false
            })
        },
        handleUploadSuccess = () => getData(1),
       
        checkedImage = computed(() => list.value.filter(o => o.checked));
    defineExpose({
        loadData,
        openUploadFile
    })
</script>
<style scoped>
    .image-main {
        position: relative;
    }
    .image-main .top {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 50px;
        overflow-y: auto;
        }
    .image-main .bottom {
        position: absolute;
        bottom: 0;
        height: 50px;
        left: 0;
        right: 0;
        @apply flex items-center justify-center;
    }
    .image-title {
        position: absolute;
        top: 122px;
        left: -1px;
        right: -1px;
        @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
    }
</style>