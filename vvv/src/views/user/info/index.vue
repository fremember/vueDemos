<!--
 * @Author: fremember
 * @Date: 2021-06-28 10:34:57
 * @Description: 用户信息
-->
<template>
    <section class="flex ai-s user-info">
        <div class="tac avatar-wrapper">
            <img class="cur-p avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="" @click="selectImg">
            <a-button @click="selectImg">
                <template #icon>
                    <UploadOutlined />
                </template>
                掐指一算，我要换一个头像了
            </a-button>
            <p class="tips">头像每两天才能修改一次，请知晓！</p>
            <input style="display: none;" type="file" name="file" :ref="fileInput" @change="changeEvent($event)">
        </div>
        <div class="flex_1">
            <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"></a-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { defineComponent, ref, onMounted } from 'vue'
    import { UploadOutlined } from '@ant-design/icons-vue'
    import { message } from 'ant-design-vue'
    import { useStore } from 'vuex'
    import commonSettings from '@/config'
    import axios from 'axios'
    export default defineComponent({
        name: 'UserInfo',
        components: { UploadOutlined },
        setup () {
            let fileDom = ref(null),
                store = useStore(),
                fileInput = el => {
                    fileDom.value = el
                },
                selectImg = () => {
                    fileDom.value.click()
                },
                changeEvent = (ev) => {
                    let file = ev.target.files[0],
                        { updateLimit } = commonSettings;
                    if(file.size > updateLimit) {
                        message.warning('上传文件时，文件大小请限制在2M以内！')
                    } else {
                        if(window.FileReader) {
                            let param = new FormData()  // 创建form对象
                            param.append('file', file)  // 通过append向form对象添加数据
                            store.dispatch('user/update', param)

                            // let reader = new FileReader()
                            // console.log(file)
                            // reader.readAsDataURL(file)
                            // // 监听文件读取结束后事件
                            // reader.onloadend = function(e) {
                            //     // console.log(e.target.result)
                            //     let data = {
                            //         type: file.type,
                            //         url: e.target.result,
                            //         filename: 'vvv'
                            //     }
                            //     store.dispatch('user/update', data)
                            // }
                        }
                    }
                };
            onMounted(() => {
                console.log(fileDom.value)
            })
            return {
                fileInput,
                selectImg,
                changeEvent
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .user-info {
        .avatar-wrapper {
            padding-top(60px)
            width(360px)
            .avatar {
                margin-bottom(50px)
                width(200px)
                height(200px)
                border-radius(50%)
                box-shadow: 0 0 50px #44576b
            }
            .tips {
                margin-top(20px)
                font-color(#ff5722)
            }
        }
    }
</style>