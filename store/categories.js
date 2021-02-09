import { arrayToTree, Node, search } from '../helpers/tree-helper'
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
        else {
            child.parent = parent;
            parent.children.push(child);
        }
    },
    rename(state, { id, name }) {
        const old = search(state.tree, n => n && n.id === id);
        old.node.name = name;
    },
    remove(state, n) {
        if (n.parent) {
            const idx = n.parent.children.indexOf(n);
            n.parent.children.splice(idx, 1);
        } else {
            const idx = state.tree.children.indexOf(n);
            if (idx >= 0)
                state.tree.children.splice(idx, 1);
        }
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
        this.$axios.post('/categories', { name, parent_id: (parent && parent.node && parent.node.id || null) }).then(res => {
            commit('addChild', { parent, child: new Node(res.data) });
        });

    },
    update({ commit }, payload) {
        const id = payload.id;
        const name = payload.name;
        const parent_id = payload.parent_id;
        return this.$axios.put(`/categories/${id}`, { id, name, parent_id }).then(() => {
            commit('rename', { id, name, parent_id });
        })
    },
    remove({ commit }, payload) {
        const data = payload;
        return this.$axios.delete(`/categories/${data.node.id}`).then(() => {
            commit('remove', data);
        })
    }
}