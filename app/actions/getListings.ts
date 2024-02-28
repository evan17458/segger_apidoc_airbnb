import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    // gte 是 Prisma 表示 "大於或等於" (Greater Than or Equal)。
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }
    //8:18:23
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              //  這個條件檢查預訂的結束日期是否大於或等於指定的 startDate,
              //  並且預訂的開始日期是否小於或等於指定的 startDate。
              //  如果這個條件成立,意味著預訂和指定的日期範圍有重疊。

              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
              // 這個條件檢查預訂的開始日期是否小於或等於指定的 endDate,
              // 並且預訂的結束日期是否大於或等於指定的 endDate。
              // 如果這個條件成立,也意味著預訂和指定的日期範圍有重疊。
            ],
          },
        },
      };
    }
    //lte 是 Prisma運算子,表示 "小於或等於" (Less Than or Equal)。
    //   some ，只要有任何一個預訂滿足下面的條件，就符合。
    //  每個預訂都有兩個條件，使用 OR 來表示只要滿足其中一個。
    //  這段程式碼會過濾掉任何在指定日期範圍已有有預訂記錄的房源。
    //  只有那些在指定日期範圍內沒有預訂的房源才會被包含在查詢結果中。
    //  確保展示給用戶的房源在選定的日期範圍內是可用的。
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
