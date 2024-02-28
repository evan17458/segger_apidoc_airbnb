import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
//設6:47:44
//上面參數設為可選,因為可以分別給mytrip及myreservation及listing頁面用
export default async function getReservations(params: IParams) {
  //有關放在actions的檔案,都是取資料庫的資料給page用
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    //給listing頁面使用
    if (userId) {
      query.userId = userId;
    }
    //給mytrip頁面使用
    if (authorId) {
      query.listing = { userId: authorId };
    }
    //給myReservation頁面使用
    //6:49:05

    //  這樣的設計是基於預期的查詢邏輯:
    // 根據房源ID查詢 -> 條件為 listingId
    // 根據預定者ID查詢 -> 條件為 userId
    // 根據房東ID查詢他發布的房源的預定 -> 條件為 listing.userId = authorId
    // 通過動態構建條件對象,可以實現根據不同入參彈性查詢,避免硬編碼不同的查詢函數。
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      //  與前端交互使用字符串格式更為方便
      // Date 類型在傳輸 serialization 的時候需要轉換為字符串,使用 ISO 格式可以確保前後端解析一致。
      // 避免時區問題
      // 將 Date 直接序列化為字符串,會存在時區偏移的問題,轉為 ISO 字符串可以保证時區一致。
      // 減少數據傳輸量
      // Date 對象序列化後會有更多額外屬性,轉為 ISO 字符串可以減少傳輸流量。
      // 方便日期格式化顯示
      // 在前端解析時,從 ISO 字符串生成 Date 對象方便進行各種格式化顯示。
      // 符合 RESTful API 規範
      // 在 RESTful API 中日期類型資源通常以 ISO 8601 格式提供,所以轉為 ISO 字符串可以使接口更符合規範。
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
//6:47:03
