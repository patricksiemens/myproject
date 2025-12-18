import api from "../api/api";

export async function getMe() {
  const response = await api.get("/auth/me");
  return response.data;
}
