import router from '@/router'

router.addRoute({
    path: '/',
    name: 'UsersList',
    component: () => import('@/modules/users/pages/UsersList')
})

router.addRoute({
    path: '/:id',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/users/pages/UserProfile')
})
