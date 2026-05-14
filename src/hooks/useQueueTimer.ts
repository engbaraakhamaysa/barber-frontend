import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
};

export const useQueueTimer = (customers: Customer[]) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (customers.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          return 30;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [customers]);

  return { timeLeft };
};
