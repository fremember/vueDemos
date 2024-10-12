<template>
    <el-form
        ref="form"
        v-if="model"
        :validate-on-rule-change="false"
        :model="model"
        :rules="rules"
        v-bind="$attrs"
    >
        <template v-for="(item, index) in options" :key="index">
            <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
                <!-- 非上传、编辑组件 -->
                <component
                    v-if="!['upload', 'editor'].includes(item.type)"
                    :placeholder="item.placeholder"
                    v-bind="item.attrs"
                    :is="`el-${item.type}`"
                    v-model="model[item.prop!]"
                />
                <!-- 上传组件 -->
                <el-upload
                    v-if="item.type === 'upload'"
                    v-bind="item.uploadAttrs"
                    :on-preview="onPreview"
                    :on-remove="onRemove"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-progress="onProgress"
                    :on-change="onChange"
                    :before-upload="beforeUpload"
                    :before-remove="beforeRemove"
                    :http-request="httpRequest"
                    :on-exceed="onExceed"
                >
                    <slot name="uploadArea" />
                    <slot name="uploadTip" />
                </el-upload>
                <!-- 编辑组件 -->
                <div id="editor" v-if="item.type === 'editor'"></div>
            </el-form-item>
            <!-- 可以是：单选框、复选框、下拉框 -->
            <el-form-item v-else :prop="item.prop" :label="item.label">
                <component
                    :placeholder="item.placeholder"
                    v-bind="item.attrs"
                    :is="`el-${item.type}`"
                    v-model="model[item.prop!]"
                >
                    <component
                        v-for="(child, i) in item.children"
                        :key="i"
                        :is="`el-${child.type}`"
                        :label="child.label"
                        :value="child.value"
                    />
                </component>
            </el-form-item>
        </template>
        <el-form-item>
            <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
</template>
    
<script lang='ts' setup>
    import { PropType, ref, onMounted, watch, nextTick } from 'vue'
    import { FormInstance, FormOptions } from './types/types'
    import cloneDeep from 'lodash/cloneDeep'
    import E from "wangeditor"

    const props = defineProps({
            // 表单的配置项
            options: {
                type: Array as PropType<FormOptions[]>,
                required: true
            },
            // 用户自定义上传方法
            httpRequest: {
                type: Function
            }
        }),
        emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed']);
    

    const model = ref<any>(null),
        rules = ref<any>(null),
        form = ref<FormInstance | null>(null),
        edit = ref<any>(null);
    
    const initForm = () => {
        if (props.options && props.options.length) {
            let m: any = {}, // 表单元素
                r: any = {}; // 校验规则
            props.options.map((item: FormOptions) => {
                m[item.prop!] = item.value
                r[item.prop!] = item.rules
                if (item.type === 'editor') {// 初始化文本
                    nextTick(() => {
                        const editor = new E('#editor')
                        editor.config.placeholder = item.placeholder!
                        editor.create()
                        // 初始化富文本内容
                        editor.txt.html(item.value)
                        editor.config.onchange = (newHtml: string) => {
                            model.value[item.prop!] = newHtml
                        }
                        edit.value = editor
                    })
                }
            })
            model.value = cloneDeep(m)
            rules.value = cloneDeep(r)
        }
    };
    onMounted(() => {
        initForm()
    })
    // 监听父组件传递进来的options
    watch(() => props.options, () => {
        initForm()
    }, { deep: true })

    const resetFields = () => { // 重置表单
            // 重置element-plus的表单
            form.value!.resetFields()
            if (props.options && props.options.length) {
                // 获取到富文本的配置项
                const editorItem = props.options.find(item => item.type === 'editor')
                // 重置富文本编辑器的内容
                edit.value.txt.html(editorItem!.value)
            }
        },
        validate = () => { // 表单验证方法
            return model.value!.validate
        },
        getFormData = () => { // 获取表单数据
            return model.value
        };
    // 分发方法
    defineExpose({
        resetFields,
        validate,
        getFormData
    })

    const onPreview = (file: File) => { // 点击文件列表中已上传的文件时的钩子
            emits('on-preview', file)
        },
        onRemove = (file: File, fileList: FileList) => { // 文件列表移除文件时的钩子
            emits('on-remove', { file, fileList })
        },
        onSuccess = (response: any, file: File, fileList: FileList) => { // 文件上传成功时的钩子
            // 上传图片成功 给表单上传项赋值
            let uploadItem = props.options.find(item => item.type === 'upload')!
            model.value[uploadItem.prop!] = { response, file, fileList }
            emits('on-success', { response, file, fileList })
        },
        onError = (err: any, file: File, fileList: FileList) => { // 文件上传失败时的钩子
            emits('on-error', { err, file, fileList, })
        },
        onProgress = (event: any, file: File, fileList: FileList) => { // 文件上传时的钩子
            emits('on-progress', { event, file, fileList })
        },
        onChange = (file: File, fileList: FileList) => { // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            emits('on-change', { file, fileList })
        },
        beforeUpload = (file: File) => { // 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
            emits('before-upload', file)
        },
        beforeRemove = (file: File, fileList: FileList) => {// 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
            emits('before-remove', { file, fileList })
        },
        onExceed = (files: File, fileList: FileList) => { // 当超出限制时，执行的钩子函数
            emits('on-exceed', { files, fileList })
        };
</script>
    
<style lang='scss' scoped></style>
    