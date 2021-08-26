import router from '@/router'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
    if (!store.getters['users/getUsers'].length) {
        await store.dispatch('users/fetchUsers')
    }

    next()
})
