import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    //     in 表示 id 需在陣列中,
    // currentUser.favoriteIds 取出當前用戶的最愛商品 id 陣列,
    // 使用展開運算符(...),把陣列展開,避免多一層巢狀。
    // || [] 表示如果用戶不存在最愛商品,默認傳入空陣列。
    // 所以這個查詢最終可以取得 id 在用戶最愛商品 id 陣列中的所有 listing 資料。
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
