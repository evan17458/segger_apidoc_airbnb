import prisma from "@/app/libs/prismadb";
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: 取得房東所有預約訂單
 *     parameters:
 *       - name: listingId
 *         in: query
 *         schema:
 *           type: string
 *       - name: userId
 *         in: query
 *         schema:
 *           type: string
 *       - name: authorId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of reservation objects
 *
 *       401:
 *         description: Not authenticated
 */

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
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
