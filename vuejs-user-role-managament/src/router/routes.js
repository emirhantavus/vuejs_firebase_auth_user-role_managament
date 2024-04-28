const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/" },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
      },
    ],
    meta: { auth: false },
  },
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { auth: true },
      },
      {
        path: "admin",
        component: () => import("src/pages/AdminPage.vue"),
        meta: { auth: true, roles: ["admin"] },
      },
      {
        path: "moderator",
        component: () => import("src/pages/ModeratorPage.vue"),
        meta: { auth: true, roles: ["moderator", "admin"] },
      },
      {
        path: "author",
        component: () => import("src/pages/AuthorPage.vue"),
        meta: { auth: true, roles: ["author", "admin", "moderator"] },
      },
      {
        path: "member",
        component: () => import("src/pages/MemberPage.vue"),
        meta: { auth: true, roles: ["member", "admin", "moderator", "author"] },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
