import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Index from '@/views/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('token');
    console.log(token)
    if (token == null || token == '') {
      next('/');
    } else {
      next();
    }
  }
});
 
export default router;
