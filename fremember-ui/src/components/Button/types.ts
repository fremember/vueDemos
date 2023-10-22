// 泛型的使用方式
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small' | 'default'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
    type?: ButtonType; // 按钮类型
    size?: ButtonSize; // 按钮大小
    plain?: boolean; // 按钮的填充样式
    round?: boolean; // 是否有圆角
    circle?: boolean; // 是否是圆形
    disabled?: boolean; // 是否可使用
    nativeType?: NativeType; // button元素的原生属性
    autofocus?: boolean; // 自动聚焦
}
export interface ButtonInstance {
    ref: HTMLButtonElement
}

// 使用对象字面量
// import type { PropType } from 'vue'
// export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// export type ButtonSize = 'large' | 'small' | 'default'

// export const buttonProps = {
//     type: {
//         type: String as PropType<ButtonType>
//     },
//     size: {
//         type: String as PropType<ButtonType>
//     },
//     plain: {
//         type: Boolean
//     },
//     round: {
//         type: Boolean
//     },
//     circle: {
//         type: Boolean
//     },
//     disabled: {
//         type: Boolean
//     }
// }