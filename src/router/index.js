import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged, OnAuthStateChanged } from "firebase/auth";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/register", component: () => import("../components/Authentication/Register.vue") },
    { path: "/login", component: () => import("../components/Authentication/Login.vue"), },
    { path: "/feed", 
      component: () => import("../views/Feed.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async(to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()) {
      next();
    } else {
      alert("you dont have access!");
      next("/");
    }
  } else{
    next();
  }
});
export default router;