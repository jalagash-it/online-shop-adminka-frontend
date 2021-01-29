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
  checkToken({ commit }) {
    return new Promise(function (resolve, reject) {
      const token = localStorage.getItem('api-token')
      if (!token) {
        commit('setUser', null)
        reject(null)
      }
      this.$axios.$post('/check-token').then((res) => {
        const user = res.data
        commit('setUser', user)
        resolve(user)
      })
    })
  },
}
