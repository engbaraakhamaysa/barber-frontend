import { BASE_URL } from "./config";
export const getSlots = async (barberId: number) => {
  const res = await fetch(`${BASE_URL}/api/slots/${barberId}`);
  return res.json();
};
