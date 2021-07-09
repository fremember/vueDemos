<!--
 * @Author: fremember
 * @Date: 2021-06-28 15:05:08
 * @Description: icon字体组件
-->
<template>
    <component :is="compName" />
</template>
<script type="text/ecmascript-6">
    import {
        UserOutlined,
        FileTextOutlined,
        MenuOutlined,
        AreaChartOutlined,
        PieChartOutlined,
        SketchOutlined,
        CloseOutlined,
        WarningOutlined,
        CloseCircleOutlined,
        BugOutlined,
        AimOutlined,
        SyncOutlined,
        IdcardOutlined,
        EditOutlined,
        SoundOutlined,
        SettingOutlined,
        SkinOutlined,
        PoweroffOutlined,
        CrownOutlined,
        FireOutlined
    } from '@ant-design/icons-vue'
    import { ref, onMounted, defineComponent } from 'vue'
    export default defineComponent ({
        name: 'MineIcon',
        components: {
            UserOutlined,
            FileTextOutlined,
            MenuOutlined,
            AreaChartOutlined,
            PieChartOutlined,
            SketchOutlined,
            CloseOutlined,
            WarningOutlined,
            CloseCircleOutlined,
            BugOutlined,
            AimOutlined,
            SyncOutlined,
            IdcardOutlined,
            EditOutlined,
            SoundOutlined,
            SettingOutlined,
            SkinOutlined,
            PoweroffOutlined,
            CrownOutlined,
            FireOutlined
        },
        props: {
			componentName: {
				default: '',
				required: true,
				type: String
			}
		},
		setup (props) {
			let getProps = (attr) => {
					return ref(attr)
				},
				compName = getProps(props.componentName)
			return {
				compName
			}
		}
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>