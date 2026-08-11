import { useEffect, useState } from "react";

const SERVICE_DURATION = 60 * 1000;

export function useQueueTimer(
  queueId: number | undefined,
  startedAt: string | null | undefined,
) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  ///////////////////////////////////////////
  // UPDATE CURRENT TIME EVERY SECOND
  ///////////////////////////////////////////

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  ///////////////////////////////////////////
  // NO CURRENT CUSTOMER
  ///////////////////////////////////////////

  if (!queueId || !startedAt) {
    console.log("TIMER: NO CUSTOMER", {
      queueId,
      startedAt,
    });

    return {
      currentTime,
      serviceTime: 0,
      remainingTime: SERVICE_DURATION,
      serviceCompleted: false,
    };
  }

  ///////////////////////////////////////////
  // GET SERVICE START TIME
  ///////////////////////////////////////////

  const startTime = new Date(startedAt).getTime();

  ///////////////////////////////////////////
  // INVALID START TIME
  ///////////////////////////////////////////

  if (Number.isNaN(startTime)) {
    console.log("TIMER: INVALID START TIME", {
      queueId,
      startedAt,
      startTime,
    });

    return {
      currentTime,
      serviceTime: 0,
      remainingTime: SERVICE_DURATION,
      serviceCompleted: false,
    };
  }

  ///////////////////////////////////////////
  // CALCULATE SERVICE TIME
  ///////////////////////////////////////////

  const serviceTime = Math.max(currentTime - startTime, 0);

  ///////////////////////////////////////////
  // CALCULATE REMAINING TIME
  ///////////////////////////////////////////

  const remainingTime = Math.max(SERVICE_DURATION - serviceTime, 0);

  ///////////////////////////////////////////
  // CHECK SERVICE COMPLETION
  ///////////////////////////////////////////

  const serviceCompleted = serviceTime >= SERVICE_DURATION;

  ///////////////////////////////////////////
  // DEBUG
  ///////////////////////////////////////////

  console.log("🔥 TIMER DEBUG:", {
    queueId,
    startedAt,
    startTime: new Date(startTime).toISOString(),
    currentTime: new Date(currentTime).toISOString(),
    serviceTime,
    serviceTimeSeconds: Math.floor(serviceTime / 1000),
    remainingTime,
    remainingTimeSeconds: Math.floor(remainingTime / 1000),
    serviceCompleted,
  });

  return {
    currentTime,
    serviceTime,
    remainingTime,
    serviceCompleted,
  };
}
