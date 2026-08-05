import Axios from "../api/axios";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/users";

export const usersService = {
  async create(data: CreateUserRequest) {
    const response = await Axios.post<User>("/users", data);

    return response.data;
  },

  async get(id: number) {
    const response = await Axios.get<User>(`/users/${id}`);

    return response.data;
  },

  async getAll() {
    const response = await Axios.get<User[]>("/users");

    return response.data;
  },

  async update(id: number, data: UpdateUserRequest) {
    const response = await Axios.put<User>(`/users/${id}`, data);

    return response.data;
  },

  async delete(id: number) {
    const response = await Axios.delete(`/users/${id}`);

    return response.data;
  },
};
