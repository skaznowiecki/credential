import { createRouter, createWebHistory } from "vue-router";

import SignInView from "@/views/sign-up/SignInView.vue";
import ResetPasswordView from "@/views/sign-up/ResetPasswordView.vue";

import HomeView from "@/views/HomeView.vue";
import PhoneView from "@/views/PhoneView.vue";

import { Auth } from "aws-amplify";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        section: "credential",
        requiresAuth: true,
        title: "Mi credencial",
      },
    },
    {
      path: "/phones",
      name: "Phone",
      component: PhoneView,
      meta: {
        section: "phones",
        requiresAuth: true,
        title: "Teléfonos útiles",
      },
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

router.beforeEach(async (to) => {
  document.title = to.meta.title || DEFAULT_TITLE;

  if (!to.meta.requiresAuth) {
    return;
  }

  try {
    await Auth.currentSession();
  } catch (error) {
    return "/sign-in";
  }
  return;
});

export default router;
