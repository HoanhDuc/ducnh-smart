import { $axios, $axiosInstance } from "@/plugins/axios";
interface payloadGetList {
  q: string;
  page: number;
}
export interface IItemUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}
interface IUserInfo {
  data: IItemUser[];
  totalItems: number;
}
const user = () => ({
  async fetchListUser({ q, page }: payloadGetList): Promise<IUserInfo> {
    const response = await $axiosInstance.get("search/users", {
      params: {
        q,
        per_page: 12,
        ...(page && { page }),
      },
    });
    return {
      data: response.data.items,
      totalItems: response.data.total_count,
    };
  },
  async fetchListUserFollows(url: string) {
    try {
      const response = await $axiosInstance.get(url);
      return response.data.length || 0;
    } catch (error) {
      return console.log(error);
    }
  },
});

export default user;
