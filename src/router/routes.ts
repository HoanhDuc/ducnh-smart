export const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        name: "HomePage",
        path: "/",
        component: () => import("@/pages/youtube/HomePage.vue"),
      },
      {
        name: "Watch",
        path: "/watch",
        component: () => import("@/pages/youtube/ViewPage.vue"),
      },
    ],
  },
];
