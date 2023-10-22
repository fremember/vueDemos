import { ref, reactive, computed } from 'vue'
import { notification } from '@/utils/element-plus'

// 列表、分页、搜索、删除、修改状态
export function useInitTable (opt = {}) {
    let searchForm = null,
        resetSearchForm = null;
    if(opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchForm = () => {
            // for (const key of opt.searchForm) {
            //     searchForm[key] = opt.searchForm[key]
            // }
            Object.keys(opt.searchForm).forEach(key => {
                searchForm[key] = opt.searchForm[key]
            })
            getData()
        }
    }
    let tableData = ref([]),
        loading = ref(false),
        currentPage = ref(1),
        total = ref(0),
        limit = ref(10);
    function getData (p = null) {
        if(typeof p == 'number') {
            currentPage.value = p
        }
        loading.value = true
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                if(opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
                    opt.onGetListSuccess(res)
                } else {
                    tableData.value = res.list
                    total.value = res.totalCount
                }
            })
            .finally(() => {
                loading.value = false
            })
    }
    getData()

    const handleDelete = (id) => {// 删除
            loading.value = true
            opt.delete(id)
                .then(res => {
                    notification({ message: '删除成功' })
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
        },
        handleStatusChange = (status, row) => {// 修改状态
            row.statusLoading = true
            opt.updateStatus(row.id, status)
            .then(res => {
                notification({ message: '修改状态成功' })
                row.status = status
            })
            .finally(() => {
                row.statusLoading = false
            })
        },
        multiSelectionIds = ref([]),
        handleSelectionChange = (e) => {
            console.log(e)
            multiSelectionIds.value = e.map(o => o.id)
        },
        multipleTableRef = ref(null),
        handleMultiDelete = () => {// 批量删除
            loading.value = true
            opt.delete(multiSelectionIds.value)
                .then(() => {
                    notification({ message: '删除成功' })
                    if (multipleTableRef.value) {// 清空选中
                        multipleTableRef.value.clearSelection()
                    }
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
        },
        handleMultiStatusChange = (status) => {
            loading.value = true
            opt.updateStatus(multiSelectionIds.value, status)
                .then(() => {
                    notification({ message: '修改状态成功' })
                    if (multipleTableRef.value) {// 清空选中
                        multipleTableRef.value.clearSelection()
                    }
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
        };
    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange,
        handleSelectionChange,
        multipleTableRef,
        handleMultiDelete,
        handleMultiStatusChange,
        multiSelectionIds
    }
}

// 新增、修改
export function useInitForm (opt = {}) {
    // 表单部分
    const formDrawerRef = ref(null),
        formRef = ref(null),
        defaultForm = opt.form,
        form = reactive({}),
        rules = opt.rules || {},
        editId = ref(0),
        drawerTitle = computed(() => editId.value ? '修改' : '新增'),
        handleSubmit = () => {
            formRef.value.validate((valid) => {
                if(!valid) return
                formDrawerRef.value.showLoading()
                let body = {}
                if(opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
                    body = opt.beforeSubmit({ ...form })
                } else {
                    body = form
                }
                const fn = editId.value ? opt.update(editId.value, body) : opt.create(body)
                fn.then(() => {
                    notification({ message: `${drawerTitle.value}成功` })
                    opt.getData(editId.value ? false : 1)// 修改刷新当前页，新增刷新第一页
                    formDrawerRef.value.close()
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
            })
        },
        resetForm = (row = false) => {// 重置表单
            if(formRef.value) formRef.value.clearValidate()
            for(const key in defaultForm) {
                form[key] = row[key]
            }
        },
        handleCreate = () => {// 新增
            editId.value = 0
            resetForm(defaultForm)
            formDrawerRef.value.open()
        },
        handleEdit = (row) => {// 编辑
            editId.value = row.id
            resetForm(row)
            formDrawerRef.value.open()
        };
    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit
    }
}