import api from "../api/api";

export async function loginRequest(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function registerRequest(
  email: string,
  password: string,
  role: "admin" | "user"
) {
  const response = await api.post("/auth/register", {
    email,
    password,
    role,
  });

  return response.data;
}
