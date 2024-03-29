<template>
    <div v-if="modelValue && preview">
        <el-image
            v-if="typeof modelValue == 'string'"
            :src="modelValue"
            fit="cover"
            class="w-[100px] h-[100px] rounded border mr-2"
        />
        <div v-else class="flex flex-wrap">
            <div
                class="relative mx-1 mb-2 w-[100px] h-[100px]"
                v-for="(url, index) in modelValue"
                :key="index"
            >
                <el-icon 
                    class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full"
                    style="z-index: 10;"
                    @click="removeImage(url)">
                    <CircleClose />
                </el-icon>
                <el-image
                    :src="url"
                    fit="cover"
                    class="w-[100px] h-[100px] rounded border mr-2"
                />
            </div>
        </div>
    </div>
    <div v-if="preview" class="choose-image-btn" @click="open">
        <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
    </div>
    <el-dialog
        title="选择图片"
        v-model="dialogVisible"
        width="80%"
        top="5vh"
    >
        <el-container class="bg-white rounded" style="height: 70vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <image-aside ref="ImageAsideRef" @change="handleAsideChange"/>
                <image-main :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose"/>
            </el-container>
        </el-container>
        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
    import { ref } from 'vue'

    import ImageAside from './ImageAside.vue'
    import ImageMain from './ImageMain.vue'

    import { notification } from '@/utils/element-plus'

    let urls = []
    const props = defineProps({
            modelValue:[String,Array],
            limit:{
                type:Number,
                default:1
            },
            preview:{
                type:Boolean,
                default:true
            }
        }),
        emit = defineEmits(['update:modelValue']);
    const dialogVisible = ref(false),
        callbackFunction = ref(null),
        open = (callback = null) => {
            callbackFunction.value = callback
            dialogVisible.value = true
        },
        close = () => dialogVisible.value = false,
        ImageAsideRef = ref(null),
        handleOpenCreate = () => ImageAsideRef.value.handleCreate(),
        ImageMainRef = ref(null),
        handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id),
        handleOpenUpload = () => ImageMainRef.value.openUploadFile(),
        
        handleChoose = (e) => {
            urls = e.map(o => o.url)
        },
        submit = () => {
            let value = []
            if(props.limit == 1) {
                value = urls[0]
            } else {
                value = props.preview ? [ ...props.modelValue, ...urls ] : [ ...urls ]
                if(value.length > props.limit){
                    let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit
                    return toast(`最多还能选择${limit}张`)
                }
            }
            if(value && props.preview){
                emit('update:modelValue', value)
            }
            if(!props.preview && typeof callbackFunction.value === "function"){
                callbackFunction.value(value)
            }
            close()
        },
        removeImage = (url)=> emit('update:modelValue', props.modelValue.filter(u => u != url));
    defineExpose({
        open
    })
</script>
<style scoped>
    .image-header {
        border-bottom: 1px solid #eeeeee;
        @apply flex items-center;
    }
    .choose-image-btn {
        @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
    }
</style>