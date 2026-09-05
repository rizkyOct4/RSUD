import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

// * CAR LIST =======
type TGETDashboardCarList = {
  limit: number;
  offset: number;
};
export const GETDashboardCarList = async ({
  limit,
  offset,
}: TGETDashboardCarList) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
    amount_car: number;
  }>`
    SELECT
    c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, c.status, COALESCE(COUNT(c.id), 0)::INTEGER AS amount_car
      FROM "car" c
    WHERE c.status = 'ACTIVE'::"CarStatus"
    GROUP BY 
        c.brand,
        c.model,
        c.plate_number,
        c.daily_rate,
        c.pb_id,
        c.status,
        c.created_at
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};
