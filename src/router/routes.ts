export const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/layouts/default.vue"),
    redirect: { path: "/search" },
    children: [
      {
        name: "Search",
        path: "/search",
        component: () => import("@/pages/youtube/SearchPage.vue"),
      },
      {
        name: "Watch",
        path: "/watch",
        component: () => import("@/pages/youtube/ViewPage.vue"),
      },
    ],
  },
];
