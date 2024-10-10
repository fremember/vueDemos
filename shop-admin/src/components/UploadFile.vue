<template name="upload-file">
    <el-upload
        drag
        multiple
        :action="updateImageAction"
        :headers="{
            token
        }"
        name="img"
        :data="data"
        :on-success="uploadSuccess"
        :on-error="uploadError"
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup>
    import { updateImageAction } from '@/api/image'
    import cookie from '@/utils/cookie'
    import { notification } from '@/utils/element-plus'
    

    defineProps({
        data: Object
    })
    const emit = defineEmits(['success']),
        token = cookie.get('token'),
        uploadSuccess = (response, uploadFile, uploadFiles) => {
            emit('success', { response, uploadFile, uploadFiles })
        },
        uploadError = (error, uploadFile, uploadFiles) => {
            const message = JSON.parse(error.message).msg || '上传失败'
            notification({  message, type: 'errors' })
        };
</script>