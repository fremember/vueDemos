<template>
    <el-table
        :data="tableData"
        v-loading="isLoading"
        :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner"
        :element-loading-background="elementLoadingBackground"
        :element-loading-svg="elementLoadingSvg"
        :element-loading-svg-view-box="elementLoadingSvgViewBox"
        @row-click="rowClick"
        v-bind="$attrs"
    >
        <template v-for="item in tableOption" :key="item.prop">
            <el-table-column
                v-if="item.prop && !item.action"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :align="item.align"
            >
                <template #default="scope">
                    <template v-if="scope.row.rowEdit">
                        <el-input size="small" v-model="scope.row[item.prop!]" />
                    </template>
                    <template v-else>
                        <template v-if="(scope.$index + scope.column.id) === currentEdit">
                            <div style="display: flex;">
                                <el-input size="small" v-model="scope.row[item.prop!]" />
                                <div>
                                    <slot name="cellEdit" v-if="$slots.cellEdit" :scope="scope"></slot>
                                    <div class="action-icon" v-else>
                                        <el-icon-check class="check" @click.stop="check(scope)" />
                                        <el-icon-close class="close" @click.stop="close(scope)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                            <span v-else>{{ scope.row[item.prop!] }}</span>
                            <component
                                :is="`el-icon-${toLine(editIcon)}`"
                                class="edit"
                                v-if="item.editable"
                                @click.stop="clickEditIcon(scope)"
                            />
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
        <el-table-column
            :label="actionOption!.label"
            :width="actionOption!.width"
            :align="actionOption!.align"
        >
            <template #default="scope">
                <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
                <slot name="action" :scope="scope" v-else></slot>
            </template>
        </el-table-column>
    </el-table>
    <div v-if="pagination && !isLoading" class="pagination" :style="{ justifyContent }">
        <el-pagination
            v-model:currentPage="current"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
    
<script lang='ts' setup>
    import { PropType, computed, ref, watch, onMounted } from 'vue'
    import { TableOptions } from './types'
    import { toLine } from '../../../utils'
    import cloneDeep from 'lodash/cloneDeep'

    let props = defineProps({
        options: { // 表格配置选项
            type: Array as PropType<TableOptions[]>,
            required: true
        },
        data: { // 表格数据
            type: Array,
            required: true
        },
        elementLoadingText: { // 加载文案
            type: String,
        },
        elementLoadingSpinner: { // 加载图标名
            type: String,
        },
        elementLoadingBackground: { // 加载背景颜色
            type: String,
        },
        elementLoadingSvg: { // 加载图标是svg
            type: String
        },
        elementLoadingSvgViewBox: { // 加载团是svg的配置
            type: String,
        },
        editIcon: { // 编辑显示的图标
            type: String,
            default: 'Edit'
        },
        isEditRow: { // 是否可以编辑行
            type: Boolean,
            default: false
        },
        editRowIndex: { // 编辑行按钮的标识
            type: String,
            default: ''
        },
        pagination: { // 是否显示分页
            type: Boolean,
            default: false
        },
        paginationAlign: { // 显示分页的对齐方式
            type: String as PropType<'left' | 'center' | 'right'>,
            default: 'left'
        },
        currentPage: { // 当前是第几页
            type: Number,
            default: 1
        },
        pageSize: { // 当前一页多少条数据
            type: Number,
            default: 10
        },
        pageSizes: { // 显示分页数据多少条的选项
            type: Array,
            default: () => [10, 20, 30, 40]
        },
        total: { // 数据总条数
            type: Number,
            default: 0
        }
    }),
    emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'size-change', 'current-change']);

    
    const handleSizeChange = (val: number) => { // 分页的每一页数据变化
            emits('size-change', val)
        },
        handleCurrentChange = (val: number) => { // 分页页数改变
            emits('current-change', val)
        };
    
    const currentEdit = ref<string>(''), // 当前被点击的单元格的标识
        tableData = ref<any[]>(cloneDeep(props.data)), // 拷贝一份表格的数据
        cloneEditRowIndex = ref<string>(props.editRowIndex), // 拷贝一份按钮的标识
        watchData = ref<boolean>(false), // 监听的标识
        current = ref<number>(props.currentPage); // 当前页码
    
    let stopWatchData = watch(() => props.data, val => {
        watchData.value = true
        tableData.value = val
        tableData.value.map((item: any) => {
            item.rowEdit = false
        })
        if (watchData.value) stopWatchData()
    }, { deep: true });

    // 监听
    watch(() => props.editRowIndex, val => {
        if (val) cloneEditRowIndex.value = val
    });
    watch(() => props.currentPage, val => {
        current.value = val
    });

    onMounted(() => {
        tableData.value.map((item: any) => {
            item.rowEdit = false
        })
    });

    
    const tableOption = computed(() => props.options.filter(item => !item.action)), // 过滤操作项之后的配置
        actionOption = computed(() => props.options.find(item => item.action)), // 操作项
        isLoading = computed(() => !props.data || !props.data.length), // 是否在加载中
        justifyContent = computed(() => { // 表格分页的排列方式
            if (props.paginationAlign === 'left') return 'flex-start'
            else if (props.paginationAlign === 'right') return 'flex-end'
            else return 'center'
        });
    
    const clickEditIcon = (scope: any) => { // 点击编辑图标
            // 会做一个判断 判断是否当前单元格被点击了
            // 拼接$index和column的id
            currentEdit.value = scope.$index + scope.column.id
        },
        check = (scope: any) => { // 点击确认
            emits('confirm', scope)
            currentEdit.value = ''
        },
        close = (scope: any) => { // 点击取消
            emits('cancel', scope)
            currentEdit.value = ''
        },
        rowClick = (row: any, column: any) => { // 点击行的事件
            // 判断是否点击的操作项
            if (column.label === actionOption.value!.label) {
                if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
                    // 编辑行的操作
                    row.rowEdit = !row.rowEdit
                    // 重置其他数据的 owEdit
                    tableData.value.map((item: any) => {
                        if (item !== row) item.rowEdit = false
                    })
                    // 重置按钮的标识
                    if (!row.rowEdit) emits('update:editRowIndex', '')
                }
            }
        };
</script>
    
<style lang='scss' scoped>
    .edit {
        width: 1em;
        height: 1em;
        position: relative;
        top: 2px;
        left: 12px;
        cursor: pointer;
    }
    .action-icon {
        display: flex;
        svg {
            width: 1em;
            height: 1em;
            margin-left: 8px;
            position: relative;
            top: 8px;
            cursor: pointer;
        }
        .check {
            color: red;
        }
        .close {
            color: green;
        }
    }
    .pagination {
        margin-top: 16px;
        display: flex;
    }
</style>
    