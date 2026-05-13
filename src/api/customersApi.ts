import { BASE_URL } from "./config";

// GET Customers Use ID Barber from server
export const getCustomers = async (barberId: number) => {
  const res = await fetch(`${BASE_URL}/customers/${barberId}`);
  return res.json();
};
