//GET Barber Info from the localStorage
export const getBarber = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};
