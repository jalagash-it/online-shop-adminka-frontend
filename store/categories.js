import { arrayToTree } from '../helpers/tree-helper'
export const state = () => ({
    tree: null,
})

export const mutations = {
    set(state, arr) {
        state.tree = arrayToTree(arr)
    },
    toggleExpand(state, node) {
        node.isExpanded = !node.isExpanded;
    }
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