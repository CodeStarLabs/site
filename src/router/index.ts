import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import About from '../views/About.vue'
import NotFound from '../views/Error.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/about',
                name: 'About',
                component: About
            },
            {
                path: '/products',
                name: 'Products',
                component: Products
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // 总是滚动到顶部
        return { top: 0 }
    }
})

// 全局前置守卫
router.beforeEach((_to, from, next) => {
    // 如果不是通过浏览器的前进/后退按钮导航，则滚动到顶部
    if (!from.name) {
        window.scrollTo(0, 0)
    }
    next()
})

export default router