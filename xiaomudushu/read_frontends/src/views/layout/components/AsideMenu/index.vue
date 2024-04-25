<template name="aside-menu">
    <el-menu
        class="aside-menu"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        unique-opened
        :collapse="isCollapse"
        @select="handleSelect"
    >
        <template v-for="menu in menuList">
            <sub-menu v-if="menu.children.length" :menus="menu" />
            <menu-item v-else :menu="menu" />
        </template>
    </el-menu>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import SubMenu from './SubMenu.vue'
    import MenuItem from './MenuItem.vue'

    const router = useRouter(),
        route = useRoute(),
        isCollapse = ref(false),
        defaultOpeneds = ref<Array<string>>([]),
        defaultActive = ref<string>(''),
        menuList = reactive<Array<any>>([
            { id: '1', title: '首页', icon: 'Menu', path: '/layout/home', children: [] },
            { id: '2', title: '权限管理', icon: 'Key', path: '', children: [
                {
                    id: '21', title: '菜单管理', icon: 'Memo', path: '/layout/menu', children: []
                },
                {
                    id: '22', title: '角色管理', icon: 'CreditCard', path: '/layout/role', children: []
                },
                {
                    id: '22', title: '用户管理', icon: 'User', path: '/layout/user', children: []
                }
            ] },
            { id: '3', title: '日志管理', icon: 'Document', path: '', children: [
                {
                    id: '31', title: '操作日志', icon: 'Memo', path: '/layout/operateLog', children: []
                },
                {
                    id: '32', title: '登录日志', icon: 'Memo', path: '/layout/loginLog', children: []
                }
            ] }
        ]);

    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
        // 只做两层
        const pid = Number(keyPath[0]) - 1,
            id = key;
        let path = '';
        if (keyPath.length == 1) {
            path = menuList[pid].path
        } else {
            path = menuList[pid].children.filter((menu: any) => menu.id === id)[0].path
        }
        defaultActive.value = id
        defaultOpeneds.value = keyPath
        router.push(path)
    }
    onMounted(() => {
        // 只做两层
        const path = route.path
        menuList.forEach((menus: any) => {
            if (menus.children.length) {
                menus.children.forEach(((menu: any) => {
                    if (menu.path === path) {
                        defaultActive.value = menu.id
                        defaultOpeneds.value = [menus.id, menu.id]
                    }
                }))
            } else {
                if (menus.path === path) {
                    defaultActive.value = menus.id
                    defaultOpeneds.value = [menus.id]
                }
            }
        })
    })
</script>

<style lang="scss" scoped src="./menu.scss"></style>