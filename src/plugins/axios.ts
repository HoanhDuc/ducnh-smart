import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
