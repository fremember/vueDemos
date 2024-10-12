export interface TableOptions {
    prop?: string, // 字段名称
    label: string, // 表头
    width?: string | number, // 对应列的宽度
    align?: 'left' | 'center' | 'right', // 对齐方式
    slot?: string, // 自定义列模板的插槽名
    action?: boolean, // 是否是操作项
    editable?: boolean // 是否可以编辑
}