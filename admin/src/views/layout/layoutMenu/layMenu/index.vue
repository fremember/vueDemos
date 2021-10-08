<!--
 * @Author: fremember
 * @Date: 2021-10-06 15:00:15
 * @Description: 递归子路由
-->
<template>
    <a-sub-menu :key="menuInfo.name">
        <template #title>{{ menuInfo.title }}</template>
        <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="item.children.length <= 1">
                <a-menu-item :key="item.url">
                    <!-- <template #icon>
                        <PieChartOutlined />
                    </template> -->
                    <router-link :to="{ path: item.url }">
                        {{ item.title }}
                    </router-link>
                </a-menu-item>
            </template>
            <template v-else>
                <lay-menu :menu-info="item" :key="item.name" />
            </template>
        </template>
    </a-sub-menu>
</template>
<script lang="ts">
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'LayMenu',
        props: ['menuInfo'],
        setup(props) {
            let getProps = (attr) => {
					return ref(attr)
				},
				menuInfo = getProps(props.menuInfo);
            return {
                menuInfo
            }
        }
    })
</script>