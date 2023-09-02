import { createRouter, createWebHistory } from "vue-router";

import SignInView from "@/views/sign-up/SignInView.vue";
import ResetPasswordView from "@/views/sign-up/ResetPasswordView.vue";

import AffiliateListView from "@/views/AffiliateListView.vue";

import { useAuthStore } from "@/stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: () => {
        return { path: '/affiliates' }
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/affiliates',
      name: 'AffiliateList',
      component: AffiliateListView,
      meta: {
        requiresAuth: true,
        title: 'Afiliados',
        section: 'affiliate'
      }
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignInView,
      meta: {
        requiresAuth: false,
        title: "Iniciar sesión",
      },
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPasswordView,
      meta: {
        requiresAuth: false,
        title: "Restablecer contraseña",
      },
    },
  ],
});

const DEFAULT_TITLE = "Facturas";

router.beforeEach((to) => {
  const store = useAuthStore();
  document.title = to.meta.title || DEFAULT_TITLE;
  if (to.meta.requiresAuth === true && !store.isLoggedIn) return "/sign-in";
});

export default router;
