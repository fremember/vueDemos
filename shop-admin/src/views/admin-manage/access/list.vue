<template name="access-list">
    <el-card shadow="never" class="border-0">
        <list-header @create="handleCreate" @refresh="getData" />
        <el-tree
            :data="tableData"
            :props="{ label: 'name', children: 'child' }"
            v-loading="loading"
            node-key="id"
            :default-expanded-keys="defaultExpandsKeys"
        >
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <el-tag
                        size="small"
                        :type="data.menu ? '' : 'info'"
                    >
                        {{ data.menu ? '菜单' : '权限' }}
                    </el-tag>
                    <el-icon v-if="data.icon" :size="16" class="ml-2">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span>{{ data.name }}</span>
                    <div class="ml-auto">
                        <el-switch
                            :modelValue="data.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="handleStatusChange($event, data)"
                        />
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        <el-button text type="primary" size="small" @click.stop="addChild(data.id)">增加</el-button>
                        <el-popconfirm
                            title="是否要删除该记录？"
                            confirmButtonText="确认"
                            cancelButtonText="取消"
                            @confirm="handleDelete(data.id)"
                        >
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
        </el-tree>
        <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader
                        v-model="form.rule_id"
                        :options="options"
                        :props="{value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false}"
                        placeholder="请选择上级菜单"
                    />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width: 30%" placeholder="名称" />
                </el-form-item>
                <el-form-item label="菜单标题" prop="icon" v-if="form.menu == 1">
                    <icon-select v-model="form.icon" />
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
                    <el-input v-model="form.frontpath" placeholder="前端路由" />
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition" placeholder="后端规则" />
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
                    <el-select v-model="form.method" placeholder="请选择请求方式" class="m-2">
                        <el-option
                            v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000" />
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
    import IconSelect from '@/components/IconSelect.vue'
    import {
        getAccessList,
        createAccess,
        updateAccess,
        updateAccessStatus,
        deleteAccess
    } from '@/api/access'
    import { useInitTable, useInitForm } from '@/mixins/useCommon'

    const store = useStore(),
        options = ref([]),
        defaultExpandsKeys = ref([]),
        {
            tableData,
            loading,
            getData,
            handleDelete,
            handleStatusChange
        } = useInitTable({
            getList: getAccessList,
            onGetListSuccess: (res) => {
                options.value = res.rules
                tableData.value = res.list
                defaultExpandsKeys.value = res.list.map(o => o.id)
            },
            delete: deleteAccess,
            updateStatus: updateAccessStatus
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
                rule_id: 0,
                menu: 0,
                name: '',
                condition: '',
                method: 'GET',
                status: 1,
                order: 50,
                icon: '',
                frontpath: ''
            },
            rules: {},
            getData,
            update: updateAccess,
            create: createAccess
        }),
        addChild = (id) => {
            handleCreate()
            form.rule_id = id
            form.status = 1
        };
</script>
<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    padding: 20px 0;
}
</style>