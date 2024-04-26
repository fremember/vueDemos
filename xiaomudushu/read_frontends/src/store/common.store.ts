import { defineStore } from 'pinia'

/**
 * 公共数据
 */
export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            collapse: false
        }
    },
    getters: {
        isCollapse: (state) => state.collapse
    },
    actions: {
        changeIsCollapse() {
            this.collapse = !this.collapse
        }
    }
})