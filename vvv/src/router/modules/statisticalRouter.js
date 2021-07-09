/*
 * @Author: fremember
 * @Date: 2021-06-28 17:33:51
 * @Description: 统计管理
 */
import Layout from '@/views/layout/index'
let statisticalRouter = {
    path: '/statistical',
    component: Layout,
    redirect: '/statistical/table',
    meta: {
        title: '统计管理',
        cache: true,
        icon: 'AreaChartOutlined'
    },
    children: [
        {
            path: 'table',
            name: 'StatisticalTable',
            component: () => import('@/views/statistical/table/index'),
            meta: {
                title: '统计表',
                cache: true,
                icon: 'PieChartOutlined'
            }
        },
        {
            path: 'commodity',
            name: 'StatisticalCommodity',
            component: () => import('@/views/statistical/commodity/index'),
            meta: {
                title: '商品统计',
                cache: true,
                icon: 'SketchOutlined'
            }
        }
    ]
}
export default statisticalRouter