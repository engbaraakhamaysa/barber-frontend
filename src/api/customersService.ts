import { BASE_URL } from "./config";
//Domain-based architcture
export const customersService = {
  get: async (barberId: number) => {
    const res = await fetch(`${BASE_URL}/customers/${barberId}`);
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/customers/${id}`, {
      method: "DELETE",
    });
  },
};
