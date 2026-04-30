// import { useEffect, useState } from "react";
// import type { User } from "../../types/User";

// type Props = {
//   users: User[];
//   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
// };

// const barbers = ["أحمد", "محمد", "علي"];

// // ⏱️ مدة كل زبون (1 دقيقة)
// const DURATION = 60 * 1000;

// export default function Dashboard({ users, setUsers }: Props) {
//   const [tick, setTick] = useState(0);

//   // ⏱️ تحديث كل ثانية
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTick((t) => t + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // 🧹 حذف تلقائي عند انتهاء الدور
//   useEffect(() => {
//     setUsers((prev) => {
//       const now = Date.now();

//       return prev.filter((user, _, arr) => {
//         const queue = arr
//           .filter((u) => u.barber === user.barber)
//           .sort((a, b) => a.createdAt - b.createdAt);

//         const position = queue.findIndex((u) => u.id === user.id);

//         const firstTime = queue[0]?.createdAt || now;

//         const elapsed = now - firstTime;

//         const shouldRemove = elapsed >= DURATION * (position + 1);

//         return !shouldRemove;
//       });
//     });
//   }, [tick, setUsers]);

//   // 👥 جلب زبائن كل حلاق
//   const getBarberUsers = (barber: string) =>
//     users
//       .filter((u) => u.barber === barber)
//       .sort((a, b) => a.createdAt - b.createdAt);

//   // ⏳ الوقت المتبقي الكلي
//   const getTotalTime = (barber: string) => {
//     const list = getBarberUsers(barber);
//     if (list.length === 0) return 0;

//     const now = Date.now();
//     const first = list[0].createdAt;

//     const elapsed = now - first;
//     const total = list.length * DURATION;

//     return Math.max(0, total - elapsed);
//   };

//   return (
//     <div>
//       <h2>📊 Dashboard</h2>

//       {barbers.map((barber) => {
//         const list = getBarberUsers(barber);
//         const timeLeft = getTotalTime(barber);

//         const sec = Math.floor(timeLeft / 1000);
//         const min = Math.floor(sec / 60);
//         const s = sec % 60;

//         return (
//           <div
//             key={barber}
//             style={{
//               padding: 12,
//               margin: 10,
//               background: "#fff",
//               borderRadius: 8,
//             }}
//           >
//             <h3>👨‍✂️ {barber}</h3>

//             <p>👥 الزبائن: {list.length}</p>

//             <p>
//               ⏳ الوقت المتبقي: {min}:{s.toString().padStart(2, "0")}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import type { User } from "../../types/User";

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const barbers = ["أحمد", "محمد", "علي"];
const DURATION = 60 * 1000;

export default function Dashboard({ users, setUsers }: Props) {
  const [tick, setTick] = useState(0);

  // ⏱️ تحديث كل ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🧹 حذف كل زبون لحاله حسب وقته الحقيقي
  useEffect(() => {
    const now = Date.now();

    setUsers((prev) =>
      prev.filter((user, _, arr) => {
        const barberQueue = arr
          .filter((u) => u.barber === user.barber)
          .sort((a, b) => a.createdAt - b.createdAt);

        const index = barberQueue.findIndex((u) => u.id === user.id);

        const startTime = barberQueue[0].createdAt;

        const userStart = startTime + index * DURATION;
        const userEnd = userStart + DURATION;

        return now < userEnd;
      }),
    );
  }, [tick, setUsers]);

  // 👥 get barber queue
  const getBarberUsers = (barber: string) =>
    users
      .filter((u) => u.barber === barber)
      .sort((a, b) => a.createdAt - b.createdAt);

  // ⏳ وقت كل حلاق (أول زبون)
  const getTotalTime = (barber: string) => {
    const list = getBarberUsers(barber);
    if (list.length === 0) return 0;

    const now = Date.now();
    const first = list[0].createdAt;

    const total = list.length * DURATION;
    const elapsed = now - first;

    return Math.max(0, total - elapsed);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        padding: "10px",
      }}
    >
      {barbers.map((barber) => {
        const list = getBarberUsers(barber);
        const timeLeft = getTotalTime(barber);

        const sec = Math.floor(timeLeft / 1000);
        const min = Math.floor(sec / 60);
        const s = sec % 60;

        return (
          <div
            key={barber}
            style={{
              padding: 12,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>👨‍✂️ {barber}</h3>

            <p>👥 الزبائن: {list.length}</p>

            <p>
              ⏳ الوقت المتبقي: {min}:{s.toString().padStart(2, "0")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
