export const generateSlots = (
  start: string,
  end: string,
  duration: number,
): string[] => {
  if (!start || !end) return [];

  const slots: string[] = [];

  let [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  let current = sh * 60 + sm;
  const endMin = eh * 60 + em;

  while (current < endMin) {
    const h = Math.floor(current / 60);
    const m = current % 60;

    slots.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    );

    current += duration;
  }

  return slots;
};
