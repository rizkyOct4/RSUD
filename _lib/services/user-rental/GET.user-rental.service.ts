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
  const query = await prisma.$queryRaw`
        SELECT cr.id, cr.total_days, cr.total_cost, cr.status, c.plate_number, c.brand, c.model
            FROM "car_return" cr
        JOIN "rental" r ON (r.id = cr.rental_id)
        JOIN "car" c ON (c.id = r.car_id)
        WHERE cr.rental_user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
            ORDER BY c.created_at DESC

        LIMIT ${limit}
        OFFSET ${offset}
    `;

  //   return camelcaseKeys(query);
};
