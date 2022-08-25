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
