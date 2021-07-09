<!--
 * @Author: fremember
 * @Date: 2021-06-23 10:30:08
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
                handleScroll = (e) => {// 滚轮事件
                    let eventDelta = e.wheelDelta || -e.deltaY * 3,
                        $container = scrollContainer.value,
                        $containerWidth = $container.offsetWidth,
                        $wrapper = scrollWrapper.value,
                        $wrapperWidth = $wrapper.offsetWidth;
                    if (eventDelta > 0) {
                        left.value = Math.min(0, left.value + eventDelta)
                    } else {
                        if ($containerWidth - padding < $wrapperWidth) {
                            if (left.value >= -($wrapperWidth - $containerWidth + padding)) {
                                // left.value = Math.max(left.value + eventDelta, $containerWidth - $wrapperWidth - padding)
                                left.value = Math.max(left.value + eventDelta, $containerWidth - $wrapperWidth)
                            }
                        } else {
                            left.value = 0
                        }
                    }
                },
                moveToTarget = ($target) => {
                    let $container = scrollContainer.value,
                        $containerWidth = $container.offsetWidth,
                        $targetLeft = $target.offsetLeft,
                        $targetWidth = $target.offsetWidth;
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
