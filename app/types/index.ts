import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
// 使用 Omit 把 Listing 的 createdAt 屬性排除在外
// 重新定義 createdAt 為 string 類型
// 因此 SafeListing 和原本的 Listing 一樣,只是把 createdAt 從 Date 格式轉換成字串格式。
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
// 使用 Omit 把 Reservation 的 createdAt、startDate、endDate 以及 listing 屬性排除在外
// 重新定義這些屬性,全部轉換成字串格式
// listing 屬性轉換成 SafeListing 類型
// 這樣做的目的是因為資料庫讀取出來的物件格式並不適合直接回傳給 Client 端。
//6:52:00
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

//它是從 User 類型派生的，但省略了部分屬性，並新增了其他的屬性。
