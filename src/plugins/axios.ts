import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
