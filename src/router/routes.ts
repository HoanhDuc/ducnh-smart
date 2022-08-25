export const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/layouts/default.vue"),
    redirect: { path: "/" },
    children: [
      {
        name: "GitHub",
        path: "/github",
        component: () => import("@/layouts/github.vue"),
        children: [
          {
            name: "Seach",
            path: "/github/search",
            component: () => import("@/pages/git-hub/SearchPage.vue"),
          },
          {
            name: "Favorite",
            path: "/github/favorite",
            component: () => import("@/pages/git-hub/FavoritePage.vue"),
          },
          {
            name: "Detail",
            path: "/github/detail",
            component: () =>
              import("@/pages/git-hub/user-detail/UserDetailPage.vue"),
          },
        ],
      },
    ],
  },
];
