import { useEffect, useState } from "react";
import { getBarber } from "../admin/utils/auth";
import { customersService } from "../api/customersService";
import { slotsService } from "../api/slotsService";

export const useHomeData = () => {
  const [customers, setCustomers] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const barber = getBarber();
      if (!barber?.id) return;

      const customersData = await customersService.get(barber.id);
      const slotsData = await slotsService.get(barber.id);

      setCustomers(customersData);
      setSlots(slotsData);
    };

    fetchData();
  }, []);

  return { customers, slots };
};
