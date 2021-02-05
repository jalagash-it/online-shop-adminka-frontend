export const state = () => ({
    user: null,
    authenticated: false,
})

export const mutations = {
    setUser(state, user) {
        state.user = user

        state.authenticated = !user === false
    },
}
export const actions = {
    current({ commit }) {
        const self = this;
        const token = localStorage.getItem('api-token')
        if (!token) {
            commit('setUser', null)
            this.$router.replace('/login')
        }
        return self.$axios.post('/auth/current')
            .then((res) => {
                const user = res.data
                commit('setUser', user)
                return user;
            }).catch(() => {
                this.$router.replace('/login')
            })

    },
    logout({ commit }) {
        this.$axios.post('/auth/logout').then(() => {
            localStorage.removeItem('api-token');
            commit('setUser', null);
            this.$router.replace('/login');
        })
    }
}