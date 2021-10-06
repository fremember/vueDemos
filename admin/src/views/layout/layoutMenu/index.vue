<!--
 * @Author: fremember
 * @Date: 2021-09-27 08:30:53
 * @Description: 
-->
<template name="component-name">
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
            <user-outlined />
            <span>nav 122</span>
        </a-menu-item>
        <a-menu-item key="2">
            <video-camera-outlined />
            <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
            <upload-outlined />
            <span>nav 3</span>
        </a-menu-item>
    </a-menu>
</template>
<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined
    } from '@ant-design/icons-vue'

   
    export default defineComponent({
        name: 'LayoutMenu',
        components: {
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined
        },
        setup() {
            let store = useStore(),
                routes = computed(() => store.getters['routes/routes']);
            onMounted(() => {
                console.log(routes.value)
            })
            return {
                selectedKeys: ref<string[]>(['1']),
                routes
            }
        }
    });
</script>
<style scoped lang="stylus"></style>