import { createRouter, createWebHistory } from 'vue-router'
import HousesListingPage from "@/pages/HousesListingPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
const routes = [
    {
        path: '/',
        name: 'HousesListingPage',
        component: HousesListingPage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },
]
const indexRouter = createRouter({
    history: createWebHistory(),
    routes
})
export default indexRouter;