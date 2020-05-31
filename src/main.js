import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;

router.beforeEach((to,from,next)=> {
  if(to.matched.some(rec => rec.meta.auth)){
    if(!store.state.user){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next();
});

NProgress.inc();
NProgress.configure({ ease: 'ease' });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
