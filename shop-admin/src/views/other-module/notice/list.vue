<template name="notice-list">
    <el-card shadow="never" class="border-0">
        <list-header @create="handleCreate" @refresh="getData" />
        <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm
                        title="是否要删除该公告？"
                        confirmButtonText="确认"
                        cancelButtonText="取消"
                        @confirm="handleDelete(row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="primary"
                                size="small"
                                text
                            >删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-end mt-5">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            ></el-pagination>
        </div>
        <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :row="5" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-card>
</template>
<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    import ListHeader from '@/components/ListHeader.vue'
    import FormDrawer from '@/components/FormDrawer.vue'

    import {
        getNoticeList,
        createNotice,
        updateNotice,
        deleteNotice
    } from '@/api/notice'
    import { useInitTable, useInitForm } from '@/mixins/useCommon'

    const store = useStore(),
        {
            tableData,
            loading,
            currentPage,
            total,
            limit,
            getData,
            handleDelete
        } = useInitTable({
            getList: getNoticeList,
            delete: deleteNotice
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
                title: '',
                content: ''
            },
            rules: {
                title: [{
                    required: true,
                    message: '公告标题不能为空',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '公告内容不能为空',
                    trigger: 'blur'
                }]
            },
            getData,
            update: updateNotice,
            create: createNotice
        });
</script>