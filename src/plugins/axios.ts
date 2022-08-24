import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
