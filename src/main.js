// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from '@/components/app.vue'
import Default from '@/components/default-list.vue'
import CollabAuthentication from '@/mixins/collabAuthentication'
import axios from 'axios'
import '@/assets/general.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.prototype.$http = axios

import MoocCourseContainer from '@/components/mooc/course-container.vue';
import MoocForm from '@/components/mooc/mooc-form.vue';
import MoocWeekContainer from '@/components/mooc/weeks-container.vue';
import TermAndConditions from '@/components/terms-and-conditions.vue';


const router = new VueRouter({
  routes: [
    // ============================ mooc ============================
    { path: '/mooc/',
      component: MoocCourseContainer,
      props: true,
      name: 'mooc_container'
    },
    { path: '/mooc/:uc_name/:week',
      component: MoocForm,
      props: true,
      name: 'mooc_form'
    },
    { path: '/mooc/:uc_name/',
      component: MoocWeekContainer,
      props: true,
      name: 'weeks_container'
    },
    // ================= terms and conditions ================
    { path: '/termsandconditions/:list_usecases/:uc_name',
      component: TermAndConditions,
      props: true,
      name: 'termsandconditions'
    },
    //===================== Default route ==================================
    { path: '*', redirect: '/mooc/' }
  ],
  base: '/usecases/',
  scrollBehavior () {
    // to scroll to the top every change of route
    return { x: 0, y: 0 }
  }
})

/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
})

CollabAuthentication.init()
  .then(() => {
    app.$mount('#app');
  });
