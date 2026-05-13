import { BASE_URL } from "./config";

export const slotsService = {
  get: async (barberId: number) => {
    const res = await fetch(`${BASE_URL}/api/slots/${barberId}`);
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/slots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/api/slots/${id}`, {
      method: "DELETE",
    });
  },

  book: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/slots/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};
