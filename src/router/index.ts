import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        children: [
            {
                path: 'money',
                component: () => import('@/views/Home/childComps/Money/Money.vue'),
                children: [
                    {
                        name: 'Edit',
                        path: 'edit',
                        component: () => import('@/views/Home/childComps/Edit/Edit.vue'),
                        children: [
                            {
                                path: ':id',
                                component: () => import('@/views/Home/childComps/Edit/EditTag.vue'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/Detail/Detail.vue'),
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/Statistics/Statistics.vue'),
        children: [
            {
                path: 'overview',
                component: () => import('@/views/Statistics/childComps/OverviewChart.vue'),
            },
            {
                path: 'expenses',
                component: () => import('@/views/Statistics/childComps/ExpensesChart.vue'),
            },
            {
                path: 'income',
                component: () => import('@/views/Statistics/childComps/IncomeChart.vue'),
            },
            {
                path: '/statistics',
                redirect: '/statistics/overview',
            },
        ],
    },
    {
        path: '*',
        name: 'NoMatch',
        component: () => import('@/views/NoMatch/NoMatch.vue'),
    },
];

const router = new VueRouter({
    routes,
    mode: 'hash',
});

export default router;
