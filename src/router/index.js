import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 配置路由规则 路径和组件的对应
      path: '/',
      redirect: '/home'
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/home',
      component: ()=>import ("../views/Home.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/section',
      component: ()=>import ("../views/Section.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/disease',
      component: ()=>import ("../views/Disease.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/expert',
      component: ()=>import ("../views/Expert.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/technique',
      component: ()=>import ("../views/Technique.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/article',
      component: ()=>import ("../views/Article.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/expertdetail',
      component: ()=>import ("../views/ExpertDetail.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/articledetail',
      component: ()=>import ("../views/ArticleDetail.vue")
    },
    {
      // 配置路由规则 路径和组件的对应
      path: '/reserve',
      component: ()=>import ("../views/Reserve.vue")
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
