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
            name: "SeachGitHub",
            path: "/github/search",
            component: () => import("@/pages/git-hub/SearchPage.vue"),
          },
          {
            name: "Favorite",
            path: "/github/favorite",
            component: () => import("@/pages/git-hub/FavoritePage.vue"),
          },
          {
            name: "DetailGitHub",
            path: "/github/detail",
            component: () =>
              import("@/pages/git-hub/user-detail/UserDetailPage.vue"),
          },
        ],
      },
      {
        name: "Youtube",
        path: "/youtube",
        component: () => import("@/pages/youtube/index.vue"),
        children: [
          {
            name: "SeachYoutube",
            path: "/youtube/search",
            component: () => import("@/pages/youtube/index.vue"),
          },
        ],
      },
    ],
  },
];
