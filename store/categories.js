import { arrayToTree, Node } from '../helpers/tree-helper'
export const state = () => ({
    tree: null,
})

export const mutations = {
    set(state, arr) {
        state.tree = arrayToTree(arr)
    },
    toggleExpand(state, node) {
        node.isExpanded = !node.isExpanded;
    },
    addChild(state, { parent, child }) {
        if (!parent)
            tree.children.push(child);
        else
            parent.children.push(child);

    }
}
export const actions = {
    all({ commit }) {
        this.$axios.get('/categories').then(res => commit('set', res.data));
    },
    byId() {},
    create({ commit }, payload) {
        let parent = payload.parent;
        let name = payload.name;
        this.$axios.post('/categories', { name }).then(res => {
            commit('addChild', { parent, child: new Node(res.data) });
        });

    },
    update() {},
    delete() {}
}