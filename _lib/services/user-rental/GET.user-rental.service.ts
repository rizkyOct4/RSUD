import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

// * STATISTICS =======
export const GETUserCarReturn = async ({
  publicId,
  limit,
  offset,
}: {
  publicId: string | undefined;
  limit: number;
  offset: number;
}) => {
  const query = await prisma.$queryRaw<any>`
        SELECT cr.id, cr.total_days, cr.total_cost, cr.status, c.pb_id AS car_public_id, c.plate_number, c.brand, c.model, r.start_date, r.end_date
            FROM "car_return" cr
        JOIN "rental" r ON (r.id = cr.rental_id)
        JOIN "car" c ON (c.id = r.car_id)
        WHERE cr.rental_user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
            ORDER BY c.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_rental: number }[]>`
      SELECT COALESCE(COUNT(id), 0) AS amount_rental
        FROM "car_return"
      WHERE rental_user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_rental) > limit + offset;

  return { data, hasMore };
};
