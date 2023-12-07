<script setup lang="ts">
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { Toast } from 'vant'

    import { taskAllList } from '@/api/task'
    import CompanySource from './components/CompanySource.vue'
    import CompanyTask from './components/CompanyTask.vue'
    
    const router = useRouter(),
        companyId = router.currentRoute.value.params.id,
        state = reactive({
            item: '',
            taskList: [],
            loading: false
        });
    const leftBack = () => history.back(),
        gotoMessage = () => {
            router.push('/message/talk/'+ state.item.user_id)
        },
        getTaskAllList = async () => {
            state.loading = true
            const res = await taskAllList({
                company_id: companyId
            })
            if (res) {
                state.taskList = res.records
                state.item = JSON.parse(sessionStorage.getItem('companyInfo'))
                state.loading = false
            } else {
                Toast(res.msg)
                state.loading = false
            }
        };
    getTaskAllList()
</script>
<template>
    <section class="common-layout">
        <van-nav-bar title="任务来源" left-arrow @click-left="leftBack"/>
        <div class="cl-content">
            <CompanySource :item="state.item"></CompanySource>
            <div class="task-wrapper">
                <CompanyTask :taskList="state.taskList"></CompanyTask>
            </div>
        </div>
    </section>
</template>
<style scoped>
.cl-content {
    display: flex;
    flex-direction: column;
}
.cl-content .task-wrapper {
    flex: 1;
    overflow-y: auto;
}
</style>