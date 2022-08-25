import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
    accept: "application/vnd.github+json"
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
