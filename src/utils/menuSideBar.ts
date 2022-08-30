export const menuList = [
  {
    icon: "https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png",
    label: "GitHub API",
    key: 'github',
    subItem: [
      {
        icon: "search",
        label: "Search",
        to: "/github/search",
      },
      {
        icon: "favorite",
        label: "Favorite",
        to: "/github/favorite",
      },
    ],
  },
  {
    icon: "https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png",
    label: "Youtube API",
    key: 'youtube',
    subItem: [
      {
        icon: "search",
        label: "Search",
        to: "/youtube/search",
      },
      {
        icon: "thumb_up",
        label: "Subcribes",
        to: "/youtube/subcription",
      },
    ],
  },
];