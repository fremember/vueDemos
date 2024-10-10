const state = {
        asideWidth: '250px'
    },
    getters = {
        asideWidth: (state) => state.asideWidth
    },
    mutations = {
        setAsideWidth(state) {
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        }
    },
    actions = {
    },
    common = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };

export default common