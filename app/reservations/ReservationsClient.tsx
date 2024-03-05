// "use client";

// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useCallback, useState } from "react";
// import { useRouter } from "next/navigation";

// import { SafeReservation, SafeUser } from "@/app/types";
// import Heading from "@/app/components/Heading";
// import Container from "@/app/components/Container";
// import ListingCard from "@/app/components/listings/ListingCard";

// interface ReservationsClientProps {
//   reservations: SafeReservation[];
//   currentUser?: SafeUser | null;
// }

// const ReservationsClient: React.FC<ReservationsClientProps> = ({
//   reservations,
//   currentUser,
// }) => {
//   const router = useRouter();
//   const [deletingId, setDeletingId] = useState("");

//   const onCancel = useCallback(
//     (id: string) => {
//       setDeletingId(id);

//       axios
//         .delete(`/api/reservations/${id}`)
//         .then(() => {
//           toast.success("預訂已取消");
//           router.refresh();
//         })
//         .catch(() => {
//           toast.error("出了點問題.");
//         })
//         .finally(() => {
//           setDeletingId("");
//         });
//     },
//     [router]
//   );

//   return (
//     <Container>
//       <Heading title="預訂" subtitle="您的房產上預訂" />
//       <div
//         className="
//           mt-10
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           xl:grid-cols-5
//           2xl:grid-cols-6
//           gap-8
//         "
//       >
//         {reservations.map((reservation: any) => (
//           <ListingCard
//             key={reservation.id}
//             data={reservation.listing}
//             reservation={reservation}
//             actionId={reservation.id}
//             onAction={onCancel}
//             disabled={deletingId === reservation.id}
//             actionLabel="取消客人預訂"
//             currentUser={currentUser}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default ReservationsClient;
