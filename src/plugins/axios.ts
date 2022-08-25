import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
