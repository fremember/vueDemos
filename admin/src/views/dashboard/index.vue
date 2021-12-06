<!--
 * @Author: fremember
 * @Date: 2021-09-26 09:14:58
 * @Description: 首页
-->
<template>
    <div class="dashboard">
        <ul>
            <li v-for="route in routes" :key="route.name">
                <p>{{ route.title }}</p>
                <ol v-if="route.children.length > 0">
                    <li v-for="item in route.children" :key="item.url">{{ item.title }}</li>
                </ol>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">

    import { defineComponent, ref, computed, onMounted } from 'vue'
    import { useStore } from 'vuex'

    export default defineComponent({
        name: 'Dashboard',
        setup () {
            let store = useStore(),
                routes = computed(() => store.getters['routes/routes']);
            onMounted(() => {
                // console.log(routes.value)
            })
            return {
                routes
            }
        }
    })
</script>
<style scoprd lang="stylus"></style>