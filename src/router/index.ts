import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue"
import Password from "../pages/password.vue"
import Hash from "../pages/hash.vue"
import Sha1 from "../pages/sha1.vue"
import UrlCheck from "../pages/url-check.vue"
import QrCode from "../pages/qr-code.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "password",
      path: "/password",
      component: Password,
    },
    {
      name: "hash",
      path: "/hash",
      component: Hash,
    },
    {
      name: "sha1",
      path: "/sha1",
      component: Sha1,
    },
    {
      name: "url-check",
      path: "/url-check",
      component: UrlCheck,
    },
    {
      name: "qr-code",
      path: "/qr-code",
      component: QrCode,
    }
  ],
});

export default router;
