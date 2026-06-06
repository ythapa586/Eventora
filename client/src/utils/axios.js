import axios from "axios";

const api = axios.create({
  baseURL: "https://railway.com/project/0317b899-b61b-4d18-960e-538a91cd44c2/service/c652985b-d214-4d62-aa81-84ade009d6ef?environmentId=f57b1d14-675a-4b0e-851a-da58998b231b&id=b7f86fec-fe66-45f0-826b-c6bc1f036f36#build/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;