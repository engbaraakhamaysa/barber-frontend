import Axios from "../../api/axios";
import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "./customer.types";

export const customerService = {
  ///////////////////////////////////////////
  // CREATE CUSTOMER
  // Create new customer
  ///////////////////////////////////////////
  async create(data: CreateCustomerRequest): Promise<Customer> {
    const response = await Axios.post<Customer>("/customers", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL CUSTOMERS
  // Get customers
  ///////////////////////////////////////////
  async getAll(): Promise<Customer[]> {
    const response = await Axios.get<Customer[]>("/customers");

    return response.data;
  },

  ///////////////////////////////////////////
  // GET CUSTOMER BY ID
  // Get single customer
  ///////////////////////////////////////////
  async get(id: number): Promise<Customer> {
    const response = await Axios.get<Customer>(`/customers/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE CUSTOMER
  // Update customer information
  ///////////////////////////////////////////
  async update(id: number, data: UpdateCustomerRequest): Promise<Customer> {
    const response = await Axios.put<Customer>(`/customers/${id}`, data);

    return response.data;
  },

  ///////////////////////////////////////////
  // DELETE CUSTOMER
  // Delete customer
  ///////////////////////////////////////////
  async delete(id: number): Promise<void> {
    await Axios.delete(`/customers/${id}`);
  },
};
