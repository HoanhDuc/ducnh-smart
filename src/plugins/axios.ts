import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
