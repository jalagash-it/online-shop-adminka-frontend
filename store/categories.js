export const state = () => ({
    list: null,
})

export const mutations = {
    set(state, arr) {
        state.list = arr
    },
}
export const actions = {
    all({ commit }) {
        this.$axios.get('/categories').then(res => commit('set', res.data));
    },
    byId() {},
    create() {},
    update() {},
    delete() {}
}