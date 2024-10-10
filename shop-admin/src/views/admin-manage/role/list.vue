<template name="role-list">
    <el-card shadow="never" class="border-0">
        <list-header @create="handleCreate" @refresh="getData" />
        <el-table
            :data="tableData"
            stripe
            style="width: 100%;"
            v-loading="loading"
        >
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="desc" label="角色描述" width="380" />
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
                    <el-button type="primary" size="small" text @click="openSetRule(row)">配置权限</el-button>
                    <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm title="是否删除该公告？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(row.id)">
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
        <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" placeholder="角色名称" />
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :row="5" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </form-drawer>
        <form-drawer ref="setRuleFormDrawerRef" title="权限配置" @submit="handleSetRuleSubmit">
            <el-tree-v2
                ref="elTreeRef"
                node-key="id"
                :check-strictly="checkStrictly"
                :default-expanded-keys="defaultExpandedKeys"
                :data="ruleList"
                :props="{ label: 'name', children: 'child' }"
                show-checkbox
                :height="treeHeight"
                @check="handleTreeCheck"
            >
                <template #default="{ node, data }">
                    <div class="flex items-center">
                        <el-tag :type="data.menu ? '' : 'info'" size="small">{{ data.menu ? '菜单' : '权限' }}</el-tag>
                        <span class="ml-2 text-sm">{{ data.name }}</span>
                    </div>
                </template>
            </el-tree-v2>
        </form-drawer>
    </el-card>
</template>
<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import ListHeader from '@/components/ListHeader.vue'
    import FormDrawer from '@/components/FormDrawer.vue'

    import { useInitTable, useInitForm } from '@/mixins/useCommon'

    import {
        getRoleList,
        createRole,
        updateRole,
        deleteRole,
        updateRoleStatus,
        setRoleRules
    } from '@/api/role'
    import { getRuleList } from '@/api/rule'

    import { notification } from '@/utils/element-plus'

    const store = useStore(),
        {
            getData,
            tableData,
            loading,
            total,
            currentPage,
            limit,
            handleStatusChange,
            handleDelete
        } = useInitTable({
            getList: getRoleList,
            delete: deleteRole,
            updateStatus: updateRoleStatus
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
                desc: '',
                status: 1
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ]
            },
            getData,
            update: updateRole,
            create: createRole
        }),
        setRuleFormDrawerRef = ref(null),
        ruleList = ref([]),
        treeHeight = ref(0),
        roleId = ref(0),
        defaultExpandedKeys = ref([]),
        elTreeRef = ref(null),
        ruleIds = ref([]),// 当前角色拥有的权限Id
        checkStrictly = ref(false),
        openSetRule = (row) => {
            console.log(row)
            roleId.value = row.id
            treeHeight.value = window.innerHeight - 180
            checkStrictly.value = true
            
            getRuleList(1).then(res => {
                ruleList.value = res.list
                defaultExpandedKeys.value = res.list.map(o => o.id)
                setRuleFormDrawerRef.value.open()

                // 当前角色拥有的权限ID
                ruleIds.value = row.rules.map(o => o.id)
                setTimeout(() => {
                    elTreeRef.value.setCheckedKeys(ruleIds.value)
                    checkStrictly.value = false
                }, 150)
            })
        },
        handleSetRuleSubmit = () => {
            setRuleFormDrawerRef.value.showLoading()
            setRoleRules(roleId.value, ruleIds.value)
            .then(() => {
                notification({ message: '配置成功' })
                getData()
                setRuleFormDrawerRef.value.close()
            })
            .finally(() => {
                setRuleFormDrawerRef.value.hideLoading()
            })
        },
        handleTreeCheck = (...e) => {
            const { checkedKeys, halfCheckedKeys } = e[1]
            ruleIds.value = [ ...checkedKeys, ...halfCheckedKeys ]
        };
</script>