import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
