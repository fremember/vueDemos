<!--
 * @Author: fremember
 * @Date: 2021-06-23 17:18:46
 * @Description: 左侧路由
-->
<template>
    <section class="sider">
        <div class="tac colorfff logo">fremember</div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
            <a-menu-item key="1">
                <user-outlined />
                <span>nav 1</span>
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
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined
    } from '@ant-design/icons-vue'
    import { ref } from 'vue'
    export default {
        name: 'Sider',
        components: { UserOutlined, VideoCameraOutlined, UploadOutlined },
        setup () {
            let selectedKeys = ref(['1']);
            return {
                selectedKeys
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .sider {
        .logo {
            height(50px)
            line-height(50px)
        }
    }
</style>