export const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/layouts/search.vue"),
    redirect: { path: "/" },
    children: [
      {
        name: "Seach",
        path: "/search",
        query: { name: '' },
        component: () => import("@/pages/ghub/Search.vue"),
      },
      {
        name: "Favorite",
        path: "/favorite",
        component: () => import("@/pages/ghub/Favorite.vue"),
      },
      {
        name: "Detail",
        path: "/search/detail",
        component: () => import("@/pages/ghub/detail-page/index.vue"),
      },
    ],
  },
];
