<template name="role-list">
    <el-card shadow="never" class="border-0">
        <list-header layout="create,delete,refresh" @create="handleCreate" @refresh="getData" @delete="handleMultiDelete" />

        <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%;" v-loading="loading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="规格名称" />
            <el-table-column prop="default" label="规格值" width="380" />
            <el-table-column prop="order" label="排序" />
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch
                        :modelValue="row.status"
                        :active-value="1"
                        :inactive-value="0"
                        :loading="row.statusLoading"
                        :disabled="row.super == 1"
                        @change="handleStatusChange($event, row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm title="是否删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            />
        </div>
        <form-drawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="规格名称" prop="name">
                    <el-input v-model="form.name" placeholder="规格名称" />
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input v-model="form.order" placeholder="排序" :min="1" :max="1000" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
                <el-form-item label="规格值" prop="default">
                    <tag-input v-model="form.default" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-card>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ListHeader from '@/components/ListHeader.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import TagInput from '@/components/TagInput.vue'

import { useInitTable, useInitForm } from '@/mixins/useCommon'

import {
    getSkusList,
    createSkus,
    updateSkus,
    deleteSkus,
    updateSkusStatus
} from '@/api/skus'

const store = useStore(),
    {
        getData,
        tableData,
        loading,
        total,
        currentPage,
        limit,
        handleStatusChange,
        handleDelete,
        handleSelectionChange,
        multipleTableRef,
        handleMultiDelete
    } = useInitTable({
        getList: getSkusList,
        delete: deleteSkus,
        updateStatus: updateSkusStatus
    }),
    {
        formDrawerRef,
        formRef,
        form,
        rules,
        drawerTitle,
        handleSubmit,
        handleCreate,
        handleEdit
    } = useInitForm({
        form: {
            name: '',
            default: '',
            status: 1,
            order: 50
        },
        rules: {
            name: [
                { required: true, message: '规格名称不能为空', trigger: 'blur' }
            ],
            defult: [
                { required: true, message: '规格值不能为空', trigger: 'blur' }
            ]
        },
        getData,
        update: updateSkus,
        create: createSkus
    });
</script>