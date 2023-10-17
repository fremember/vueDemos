// 可配置表单
import { CSSProperties } from 'vue'
import { RuleItem } from './rule'
import { ValidateFieldsError } from 'async-validator'

interface Callback {
    (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}

// 表单的每一项的配置选项
export interface FormOptions {
    // 表单项显示的元素
    type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
    'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
    'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
    'transfer' | 'upload' | 'editor',
    value?: any, // 表单项的值
    label?: string, // 表单项label
    prop?: string, // 表单项的标识
    rules?: RuleItem[], // 表单项的校验规则
    placeholder?: string, // 表单项的占位符
    attrs?: { // 表单元素的特有属性
        style?: CSSProperties, // css样式
        clearable?: boolean,// 是否可被清空
        showPassword?: boolean, // 是否以密码的形式显示
        disabled?: boolean, // 是否可操纵(选中、激活)
    },
    children?: FormOptions[], // 表单项的子元素
    uploadAttrs?: { // 处理上传组件的属和方法
        action: string, // 图片上传的地址
        headers?: object, // 请求头信息
        method?: 'post' | 'put' | 'patch', // 请求类型
        multiple?: boolean, // 是否支持多选文件
        data?: any,
        name?: string, // 上传的文件字段名
        withCredentials?: boolean, // 支持发送 cookie 凭证信息
        showFileList?: boolean, // 是否显示已上传文件列表
        drag?: boolean, // 是否启用拖拽上传
        accept?: string, // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
        thumbnailMode?: boolean,
        fileList?: any[], // 默认上传文件
        listType?: 'text' | 'picture' | 'picture-card', // 文件列表的类型
        autoUpload?: boolean, // 是否自动上传文件
        disabled?: boolean, // 是否禁用上传
        limit?: number // 允许上传文件的最大数量
    }
}

export interface ValidateFieldCallback {
    (message?: string, invalidFields?: ValidateFieldsError): void
}

export interface FormInstance {
    autoLabelWidth: string | undefined,
    labelSuffix: string,
    inline?: boolean,
    model?: Record<string, unknown>, // 表单数据
    size?: string,
    showMessage?: boolean,
    labelPosition?: string,
    labelWidth?: string,
    rules?: Record<string, unknown>, // 表单校验规则
    statusIcon?: boolean,
    hideRequiredAsterisk?: boolean,
    disabled?: boolean,
    
    emit: (evt: string, ...args: any[]) => void,
    registerLabelWidth(width: number, oldWidth: number): void,
    deregisterLabelWidth(width: number): void,
    validate: (callback?: Callback) => Promise<boolean>,
    resetFields: () => void,
    clearValidate: (props?: string | string[]) => void,
    validateField: (props: string | string[], cb: ValidateFieldCallback) => void
}