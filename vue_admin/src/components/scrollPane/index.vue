<!--
 * @Author: fremember
 * @Date: 2021-05-07 15:41:42
 * @Description: 滚动
-->
<template>
    <div ref="scrollContainer" class="scroll-container" @wheel.prevent="handleScroll">
        <div ref="scrollWrapper" :style="{ left: left + 'px' }" class="scroll-wrapper">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
    import { ref, defineComponent } from 'vue'
    const padding = 15
    export default defineComponent({
        name: 'ScrollPane',
        setup () {
            let scrollContainer = ref(null),
                scrollWrapper = ref(null),
                left = ref(0),
                handleScroll = (e: any): void => {// 滚轮事件
                    let eventDelta: number = e.wheelDelta || -e.deltaY * 3,
                        $container: any = scrollContainer.value,
                        $containerWidth: number = $container.offsetWidth,
                        $wrapper: any = scrollWrapper.value,
                        $wrapperWidth: number = $wrapper.offsetWidth;
                    if (eventDelta > 0) {
                        left.value = Math.min(0, left.value + eventDelta)
                    } else {
                        if ($containerWidth - padding < $wrapperWidth) {
                            if (left.value >= -($wrapperWidth - $containerWidth + padding)) {
                                left.value = Math.max(left.value + eventDelta, $containerWidth - $wrapperWidth - padding)
                            }
                        } else {
                            left.value = 0
                        }
                    }
                },
                moveToTarget = ($target: any): void => {
                    let $container: any = scrollContainer.value,
                        $containerWidth: number = $container.offsetWidth,
                        $targetLeft: number = $target.offsetLeft,
                        $targetWidth: number = $target.offsetWidth;
                    if($targetLeft < -left.value) {
                        // tag in the left
                        left.value = -$targetLeft + padding
                    } else if ($targetLeft + padding > -left.value && $targetLeft + $targetWidth < -left.value + $containerWidth - padding) {
                        // tag in the current view
                        // eslint-disable-line
                    } else {
                        // tag in the right
                        left.value = -($targetLeft - ($containerWidth - $targetWidth) + padding)
                    }
                };
            return {
                scrollContainer,
                scrollWrapper,
                left,
                handleScroll,
                moveToTarget
            }
        }
    })
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .scroll-container {
        position(relative)
        width(100%)
        white-space: nowrap
        overflow: hidden
        .scroll-wrapper {
            position(absolute)
        }
    }
</style>
