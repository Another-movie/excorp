import store from '@/store'

const state = {
    users: []
}

const getters = {
    getUsers: (state) => state.users,
    getUser: (state) => (id) => state.users.find((user) => Number(user.id) === Number(id))
}

const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
    DELETE_USER_BY_ID(state, userId) {
        state.users = state.users.filter((user) => user.id !== userId)
    },
    UPDATE_USER_BY_ID(state, user) {
        const idx = state.users.findIndex((u) => u.id === user.id)
        user.edited_at = new Date()

        return idx > -1 ? state.users.splice(idx, 1, user) : ''
    }
}
const actions = {
    async fetchUsers({ commit }) {
        const response = await fetch('users.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        const { users } = await response.json()
        commit('SET_USERS', users)
    }
}

store.registerModule('users', {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})
