<!--
 * @Author: xiangyang.peng
 * @Date: 2023-08-26 17:28:53
 * @LastEditTime: 2023-08-26 18:38:10
 * @LastEditors: fremember
 * @Description:  分类管理 > 推荐商品
 * @FilePath: /fremember_github/vueDemos/shop-admin/src/views/goods-manage/category/components/GoodsDrawer.vue
-->

<template name="GoodsDrawer">
    <form-drawer ref="formDrawerRef" title="推荐商品" @submit="handleConnect" confirmText="关联">
        <el-table :data="tableData" border stripe style="width: 100%;">
            <el-table-column prop="goods_id" label="Id" width="60" />
            <el-table-column label="商品封面" width="180">
                <template #default="{ row }">
                    <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px; height: 64px;" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="180" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm title="是否要删除该记录？" confirmButtonText="默认" cancelButtonText="取消" @confirm="handleDelete(row)">
                        <template #reference>
                            <el-button text type="primary" size="small" :loading="row.loading">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </form-drawer>
    <choose-goods ref="ChooseGoodsRef" />
</template>

<script setup>
    import { ref } from 'vue'

    import FormDrawer from '@/components/FormDrawer.vue'
    import ChooseGoods from '@/components/ChooseGoods.vue'

    import { notification } from '@/utils/element-plus'

    import {
        getCategoryGoods,
        deleteCategoryGoods,
        connectCategoryGoods
    } from '@/api/category'

    const formDrawerRef = ref(null),
        ChooseGoodsRef = ref(null),
        category_id = ref(0),
        tableData = ref([]);
    
    const getData = () => {
            return getCategoryGoods(category_id.value).then(res => {
                tableData.value = res.map(o => {
                    o.loading = false
                    return o
                })
            })
        },
        open = (item) => {
            category_id.value = item.id
            item.goodsDrawerLoading = true
            getData().then(res => formDrawerRef.value.open())
            .finally(()=>{
                item.goodsDrawerLoading = false
            })
        },
        handleDelete = (row) => {
            row.loading = true
            deleteCategoryGoods(row.id).then(res => {
                notification({ title: '删除成功', type: 'success' })
                getData()
            })
        },
        handleConnect = () => {
            ChooseGoodsRef.value.open((goods_ids) => {
                formDrawerRef.value.showLoading()
                connectCategoryGoods({
                    category_id: category_id.value,
                    goods_ids
                }).then(res => {
                    getData()
                    notification({ title: '关联成功', type: 'success' })
                }).finally(()=>{
                    formDrawerRef.value.hideLoading()
                })
            })
        };
    defineExpose({
        open
    });
</script>