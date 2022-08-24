import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token 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`,
  },
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
