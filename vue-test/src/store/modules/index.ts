import { defineStore } from 'pinia'

interface StateInterface {
    token: string
}

export const commonStore = defineStore('common', {
    state: (): StateInterface => {
        return {
            token: '11'
        }
    },
    getters: {
        headerToken: (state: StateInterface) => `header ${state.token}`
    },
    actions: {
        changeToken (token: string) {
            this.token = token
        }
    },
    persist: true
})
