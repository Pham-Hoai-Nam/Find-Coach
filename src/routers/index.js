import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import CoachesList from '@/views/coaches/CoachesList.vue';
import CoachDetail from '@/views/coaches/CoachDetail.vue';
import CoachRegistration from '@/views/coaches/CoachRegistration.vue';
import ContactCoach from '@/views/requests/ContactCoach.vue';
import RequestsReceived from '@/views/requests/RequestsReceived.vue';
import UserAuth from '@/views/auth/UserAuth.vue';
import NotFound from '@/views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/coaches',
  },
  {
    path: '/coaches',
    name: 'CoachesList',
    component: CoachesList,
  },
  {
    path: '/coaches/:id',
    name: 'CoachDetail',
    props: true,
    component: CoachDetail,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        //coaches/c1/contact
        path: 'contact',
        name: 'Contact',
        component: ContactCoach,
      },
    ],
  },
  {
    path: '/register',
    name: 'CoachRegistration',
    component: CoachRegistration,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/requests',
    name: 'RequestsReceived',
    component: RequestsReceived,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/auth',
    name: 'UserAuth',
    component: UserAuth,
    meta: {
      title: 'User Authentication',
      requiresUnauth: true,
    },
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.getters['auth/isAuthenticated'])
  {
    next('/auth');
  }
  else if(to.meta.requiresUnauth && store.getters['auth/isAuthenticated'])
  {
    next('/coaches');
  }
  else {
    next();
  }
 
})

const DEFAULT_TITLE = 'Find-Coach';
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router;
