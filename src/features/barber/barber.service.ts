import Axios from "../../api/axios";

import type {
  BarberWithUser,
  CreateBarberRequest,
  UpdateBarberRequest,
} from "./barber";

export const barberService = {
  ///////////////////////////////////////////
  // CREATE BARBER
  // Create new barber linked to shop
  ///////////////////////////////////////////
  async create(data: CreateBarberRequest): Promise<BarberWithUser> {
    const response = await Axios.post<BarberWithUser>("/barbers", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL BARBERS BY SHOP
  // Get barbers inside specific shop
  ///////////////////////////////////////////
  async getByShopId(shopId: number): Promise<BarberWithUser[]> {
    const response = await Axios.get<BarberWithUser[]>(
      `/barbers/shop/${shopId}`,
    );

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BARBER BY ID
  // Get single barber details
  ///////////////////////////////////////////
  async get(id: number): Promise<BarberWithUser> {
    const response = await Axios.get<BarberWithUser>(`/barbers/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE BARBER
  // Update barber information
  ///////////////////////////////////////////
  async update(id: number, data: UpdateBarberRequest): Promise<BarberWithUser> {
    const response = await Axios.put<BarberWithUser>(`/barbers/${id}`, data);

    return response.data;
  },

  ///////////////////////////////////////////
  // DELETE BARBER
  // Delete barber
  ///////////////////////////////////////////
  async delete(id: number): Promise<void> {
    await Axios.delete(`/barbers/${id}`);
  },
};
