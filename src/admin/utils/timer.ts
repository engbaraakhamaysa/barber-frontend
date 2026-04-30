let subscribers: (() => void)[] = [];

setInterval(() => {
  subscribers.forEach((fn) => fn());
}, 1000);

export const subscribe = (fn: () => void) => {
  subscribers.push(fn);

  return () => {
    subscribers = subscribers.filter((f) => f !== fn);
  };
};

// ⏱️ وقت النظام الحقيقي
export const now = () => Date.now();
