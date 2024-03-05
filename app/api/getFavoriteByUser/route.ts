import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
/**
 * @swagger
 * /api/listings/favorites:
 *   get:
 *     summary: 取得使用者我的最愛
 *     responses:
 *       200:
 *         description: Array of favorite listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       401:
 *         description: Not authenticated
 */
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
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
