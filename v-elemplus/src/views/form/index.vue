<template>
    <div>
        <f-form
            ref="form"
            label-width="100px"
            :options="options"
            @on-change="handleChange"
            @before-upload="handleBeforeUpload"
            @on-preview="handlePreview"
            @on-remove="handleRemove"
            @before-remove="beforeRemove"
            @on-success="handleSuccess"
            @on-exceed="handleExceed"
        >
            <template #uploadArea>
                <el-button size="small" type="primary">Click to upload</el-button>
            </template>
            <template #uploadTip>
                <div style="color: #ccc; font-size: 12px;">jpg/png files with a size less than 500kb</div>
            </template>
            <template #action="scope">
                <el-button type="primary" @click="submitForm(scope)">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </template>
        </f-form>
    </div>
</template>
    
<script lang='ts' setup>
    import { ref, Ref } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { FormInstance, FormOptions } from './../../components/Form/src/types/types'
    
    interface Scope {
        form: FormInstance,
        model: any
    }

    type RefDom<T extends HTMLElement = HTMLDivElement> = Ref<T | null>;

    // const form: RefDom = ref<any>(null),
    const form = ref<any>(null),
        options: FormOptions[] = [// 表单元素
            {// 表单项
                type: 'input',
                value: '',
                label: '用户名',
                prop: 'username',
                placeholder: '请输入用户名',
                rules: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 2, max: 6, message: '用户名在2-6位之间', trigger: 'blur' }
                ],
                attrs: {
                    clearable: true
                }
            },
            {
                type: 'input',
                value: '',
                label: '密码',
                prop: 'password',
                placeholder: '请输入密码',
                rules: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码在6-15位之间', trigger: 'blur' }
                ],
                attrs: {
                    clearable: true,
                    showPassword: true
                }
            },
            {
                type: 'select',
                value: '',
                placeholder: '请选择职位',
                prop: 'role',
                label: '职位',
                attrs: {
                    style: {
                        width: '100%'
                    }
                },
                rules: [
                    { required: true, message: '职位不能为空', trigger: 'blur' }
                ],
                children: [
                    {
                        type: 'option',
                        label: '经理',
                        value: '1'
                    },
                    {
                        type: 'option',
                        label: '主管',
                        value: '2'
                    },
                    {
                        type: 'option',
                        label: '员工',
                        value: '3'
                    }
                ]
            },
            {
                type: 'checkbox-group',
                value: [],
                prop: 'like',
                label: '爱好',
                rules: [
                    { required: true, message: '爱好不能为空', trigger: 'blur' }
                ],
                children: [
                    {
                        type: 'checkbox',
                        label: '足球',
                        value: '1'
                    },
                    {
                        type: 'checkbox',
                        label: '篮球',
                        value: '2'
                    },
                    {
                        type: 'checkbox',
                        label: '排球',
                        value: '3'
                    }
                ]
            },
            {
                type: 'radio-group',
                value: '',
                prop: 'gender',
                label: '性别',
                rules: [
                    { required: true, message: '性别不能为空', trigger: 'blur' }
                ],
                children: [
                    {
                        type: 'radio',
                        label: '男',
                        value: 'male'
                    },
                    {
                        type: 'radio',
                        label: '女',
                        value: 'female'
                    },
                    {
                        type: 'radio',
                        label: '保密',
                        value: 'not'
                    }
                ]
            },
            {
                type: 'switch',
                value: '',
                prop: 'status',
                label: '状态'
            },
            {
                type: 'upload',
                label: '上传',
                prop: 'pic',
                uploadAttrs: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                    multiple: true,
                    limit: 3
                },
                rules: [
                    { required: true, message: '图片不能为空', trigger: 'blur' }
                ]
            },
            {
                type: 'editor',
                value: '123',
                prop: 'desc',
                label: '描述',
                placeholder: '请输入描述',
                rules: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ]
            }
        ];
    
    const handleChange = (val: any) => {
            console.log('change')
            console.log(val)
        },
        handleBeforeUpload = (val: any) => {
            console.log('handleBeforeUpload')
            console.log(val)
        },
        handlePreview = (file: any) => {
            console.log('file')
            console.log(file)
        },
        beforeRemove = (val: any) => {
            console.log('beforeRemove')
            return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
        },
        handleRemove = (file: any, fileList: any) => {
            console.log('handleRemove')
            console.log(file, fileList)
        },
        handleSuccess = (val: any) => {
            console.log('success')
            console.log(val)
        },
        handleExceed = (val: any) => {
            console.log('handleExceed', val)
            ElMessage.warning(
                `The limit is 3, you selected ${val.files.length
                } files this time, add up to ${val.files.length + val.fileList.length} totally`
            )
        },
        submitForm = (scope: Scope) => {
            console.log(scope)
        },
        resetForm = () => {
            form.value.resetFields()
        };
</script>
    
<style lang='scss' scoped></style>
    