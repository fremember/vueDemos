<template name="coupon-list">
    <el-card shadow="never" class="border-0">
        <!-- 新增｜刷新 -->
        <list-header @create="handleCreate" @refresh="getData" />
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column label="优惠券名称" width="350">
                <template #default="{ row }">
                    <div
                        class="border border-dashed py-2 px-4 rounded"
                        :class="row.statusText == '领取中' ? 'active' : 'inactive'"
                    >
                        <h5 class="font-bold text-md">{{ row.name }}</h5>
                        <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="statusText" />
            <el-table-column label="优惠">
                <template #default="{ row }">
                    {{ row.type == 0 ? '满减' : '折扣' }} {{ row.type == 0 ? (`¥${row.value}`) : (`${row.value}折`) }}
                </template>
            </el-table-column>
            <el-table-column label="发放数量" prop="total" />
            <el-table-column label="已使用" prop="used" />
            <el-table-column
                label="操作"
                width="180"
                align="center"
            >
                <template #default="{ row }">
                    <el-button
                        v-if="row.statusText == '未开始'"
                        type="primary"
                        size="small"
                        text
                        @click="handleEdit(row)"
                    >修改</el-button>
                    <el-popconfirm
                        v-if="row.statusText != '领取中'"
                        title="是否要删除要优惠券？"
                        confirmButtonText="确认"
                        cancelButtonText="取消"
                        @confirm="handleDelete(row.id)"
                    >
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm
                        v-if="row.statusText == '领取中'"
                        title="是否要让该优惠券失效？"
                        confirmButtonText="失效"
                        cancelButtonText="取消"
                        @confirm="handleStatusChange(0, row)"
                    >
                        <template #reference>
                            <el-button type="danger" size="small">失效</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination
                background
                layout="prev,pager,next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            />
        </div>
        <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" :inline="false">
                <el-form-item label="优惠券名称" prop="name">
                    <el-input v-model="form.name" placeholder="优惠券名称" style="width: 50%;" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="0">满减</el-radio>
                        <el-radio :label="1">折扣</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="面值" prop="value">
                    <el-input v-model="form.value" placeholder="面值" style="width: 50%;">
                        <template #append>{{ form.type ? '折' : '元' }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="发行量" prop="total">
                    <el-input-number v-model="form.total" placeholder="发行量" :min="0" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="最低使用价格" prop="min_price">
                    <el-input v-model="form.min_price" placeholder="最低使用价格" type="number" />
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000" />
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-date-picker
                        :editable="false"
                        v-model="timerange"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange"
                        range-separator="To"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                    />
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc" placeholder="描述" type="textarea" :rows="5" />
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

    import { useInitTable, useInitForm } from '@/mixins/useCommon'

    import {
        getCouponList,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        updateCouponStatus
    } from '@/api/coupon'
    
    const store = useStore(),
        formatStatus = (row) => {
            let s = '领取中',
                start_time = (new Date(row.start_time)).getTime(),
                end_time = (new Date(row.end_time)).getTime(),
                now = (new Date()).getTime();
            if(start_time > now) {
                s = '未开始'
            } else if(end_time > now) {
                s = '已结束'
            } else if(row.status == 0) {
                s = '已失效'
            }
            return s
        },
        {
            tableData,
            loading,
            currentPage,
            total,
            limit,
            getData,
            handleDelete,
            handleStatusChange
        } = useInitTable({
            getList: getCouponList,
            onGetListSuccess: (res) => {
                tableData.value = res.list.map(o => {
                    // 转化优惠券状态
                    o.statusText = formatStatus(o)
                    return o
                })
                total.value = res.totalCount
            },
            delete: deleteCoupon,
            updateStatus: updateCouponStatus
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
                type: 0,
                value: 0,
                total: 100,
                min_price: 0,
                start_time: null,
                end_time: null,
                order: 50,
                desc: ''
            },
            getData,
            update: updateCoupon,
            create: createCoupon,
            beforeSubmit: (f) => {
                if(typeof f.start_time != 'number') {
                    f.start_time = (new Date(f.start_time)).getTime()
                }
                if(typeof f.end_time != 'number') {
                    f.end_time = (new Date(f.end_time)).getTime()
                }
                return f
            }
        }),
        timerange = computed({
            get () {
                return form.start_time && form.end_time ? [ form.start_time, form.end_time ] : []
            },
            set (val) {
                form.start_time = val[0]
                form.end_time = val[1]
            }
        })
</script>
<style scoped>
    .active {
        @apply border-rose-200 bg-rose-50 text-red-400;
    }
    .inactive {
        @apply border-gray-200 bg-gray-50 text-gray-400;
    }
</style>