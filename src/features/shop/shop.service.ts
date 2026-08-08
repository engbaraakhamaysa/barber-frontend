import Axios from "../../api/axios";

import type { Shop, CreateShopRequest, UpdateShopRequest } from "./shop";

export const shopService = {
  ///////////////////////////////////////////
  // CREATE SHOP
  // Create new shop
  ///////////////////////////////////////////
  async create(data: CreateShopRequest): Promise<Shop> {
    const response = await Axios.post<Shop>("/shops", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL SHOPS
  // Get all shops
  ///////////////////////////////////////////
  async getAll(): Promise<Shop[]> {
    const response = await Axios.get<Shop[]>("/shops");

    return response.data;
  },

  ///////////////////////////////////////////
  // GET SHOP BY ID
  // Get single shop
  ///////////////////////////////////////////
  async get(id: number): Promise<Shop> {
    const response = await Axios.get<Shop>(`/shops/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE SHOP
  // Update shop information
  ///////////////////////////////////////////
  async update(id: number, data: UpdateShopRequest): Promise<Shop> {
    const response = await Axios.put<Shop>(`/shops/${id}`, data);

    return response.data;
  },

  ///////////////////////////////////////////
  // DELETE SHOP
  // Delete shop
  ///////////////////////////////////////////
  async delete(id: number): Promise<Shop> {
    const response = await Axios.delete<Shop>(`/shops/${id}`);

    return response.data;
  },
};
