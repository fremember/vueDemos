/*
 * @Author: fremember
 * @Date: 2021-07-01 08:41:13
 * @Description: 技能路由
 */
import Layout from '@/views/layout/index'
let skillsRouter = {
    path: '/skills',
    component: Layout,
    redirect: '/skills/vue',
    meta: {
        title: '技能',
        icon: 'CrownOutlined'
    },
    children: [
        {
            path: 'JavaScript',
            name: 'SkillsJavaScript',
            component: () => import('@/views/skills/JavaScript/index.vue'),
            meta: {
                title: 'JavaScript',
                icon: ''
            }
        },
        {
            path: 'ECMAScript',
            name: 'SkillsECMAScript',
            component: () => import('@/views/skills/ECMAScript/index.vue'),
            meta: {
                title: 'ECMAScript',
                icon: ''
            }
        },
        {
            path: 'jQuery',
            name: 'SkillsJquery',
            component: () => import('@/views/skills/jQuery/index.vue'),
            meta: {
                title: 'jQuery',
                icon: ''
            }
        },
        {
            path: 'TypeScript',
            name: 'SkillsTypeScript',
            component: () => import('@/views/skills/TypeScript/index.vue'),
            meta: {
                title: 'TypeScript',
                icon: ''
            }
        },
        {
            path: 'HTML',
            name: 'SkillsHTML',
            component: () => import('@/views/skills/HTML/index.vue'),
            meta: {
                title: 'HTML',
                icon: ''
            }
        },
        {
            path: 'CSS',
            name: 'SkillsCSS',
            component: () => import('@/views/skills/css/index.vue'),
            meta: {
                title: 'CSS',
                icon: ''
            }
        },
        {
            path: 'cssMore',
            name: 'SkillsCssMore',
            component: () => import('@/views/skills/cssMore/index.vue'),
            meta: {
                title: 'cssMore',
                icon: ''
            }
        },
        {
            path: 'gulp',
            name: 'SkillsGulp',
            component: () => import('@/views/skills/gulp/index.vue'),
            meta: {
                title: 'gulp',
                icon: ''
            }
        },
        {
            path: 'webpack',
            name: 'SkillsWebpack',
            component: () => import('@/views/skills/webpack/index.vue'),
            meta: {
                title: 'webpack',
                icon: ''
            }
        },
        {
            path: 'vue',
            name: 'SkillsVue',
            component: () => import('@/views/skills/vue/index.vue'),
            meta: {
                title: 'vue',
                icon: ''
            }
        },
        {
            path: 'react',
            name: 'SkillsReact',
            component: () => import('@/views/skills/react/index.vue'),
            meta: {
                title: 'react',
                icon: ''
            }
        },
        {
            path: 'node',
            name: 'SkillsNode',
            component: () => import('@/views/skills/node/index.vue'),
            meta: {
                title: 'node',
                icon: ''
            }
        },
        {
            path: 'koa',
            name: 'SkillsKoa',
            component: () => import('@/views/skills/koa/index.vue'),
            meta: {
                title: 'koa',
                icon: ''
            }
        },
        {
            path: 'express',
            name: 'SkillsExpress',
            component: () => import('@/views/skills/express/index.vue'),
            meta: {
                title: 'express',
                icon: ''
            }
        },
        {
            path: 'deno',
            name: 'SkillsDeno',
            component: () => import('@/views/skills/deno/index.vue'),
            meta: {
                title: 'deno',
                icon: ''
            }
        },
        {
            path: 'mongodb',
            name: 'SkillsMongodb',
            component: () => import('@/views/skills/mongodb/index.vue'),
            meta: {
                title: 'mongodb',
                icon: ''
            }
        },
        {
            path: 'mysql',
            name: 'SkillsMysql',
            component: () => import('@/views/skills/mysql/index.vue'),
            meta: {
                title: 'mysql',
                icon: ''
            }
        },
    ]
}
export default skillsRouter