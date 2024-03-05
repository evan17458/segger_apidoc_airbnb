// import EmptyState from "@/app/components/EmptyState";
// import ClientOnly from "@/app/components/ClientOnly";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import getReservations from "@/app/actions/getReservations";

// import TripsClient from "./TripsClient";

// const TripsPage = async () => {
//   const currentUser = await getCurrentUser(); //取得用戶資料

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="未經授權" subtitle="請登入" />
//       </ClientOnly>
//     );
//   }

//   const reservations = await getReservations({ userId: currentUser.id });

//   if (reservations.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState title="沒有找到行程" subtitle="您似乎還沒有預訂任何行程" />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <TripsClient reservations={reservations} currentUser={currentUser} />
//     </ClientOnly>
//   );
// };

// export default TripsPage;
