import Axios from "../../../api/axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../auth.types";

export const authService = {
  async login(data: LoginRequest) {
    const response = await Axios.post<AuthResponse>("/auth/login", data);

    const authData = response.data;

    localStorage.setItem("accessToken", authData.accessToken);

    localStorage.setItem("user", JSON.stringify(authData.user));

    return authData;
  },

  async register(data: RegisterRequest) {
    const response = await Axios.post<AuthResponse>("/auth/register", data);

    return response.data;
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  },

  getToken() {
    return localStorage.getItem("accessToken");
  },
};
