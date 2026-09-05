import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

// * STATISTICS =======
export const GETStatistics = async ({
  publicId,
}: {
  publicId: string | undefined;
}) => {
  const query = await prisma.$queryRaw<
    { amount_car: number; amount_available: number }[]
  >`
  SELECT
    (
      SELECT COALESCE(COUNT(id), 0)::INTEGER
      FROM "car"
      WHERE user_id = (
        SELECT id
        FROM "user"
        WHERE public_id = ${publicId}
      )
      AND status = 'ACTIVE'::"CarStatus"
    ) AS amount_car_active,

    (
      SELECT COALESCE(COUNT(id), 0)::INTEGER
      FROM "car"
      WHERE user_id = (
        SELECT id
        FROM "user"
        WHERE public_id = ${publicId}
      )
      AND status = 'RENTED'::"CarStatus"
    ) AS amount_car_rented,

    (
      SELECT COALESCE(COUNT(id), 0)::INTEGER
      FROM "car"
      WHERE user_id = (
        SELECT id
        FROM "user"
        WHERE public_id = ${publicId}
      )
      AND status = 'RETURNED'::"CarStatus"
    ) AS amount_car_returned,

    (
      SELECT COUNT(*)::INTEGER
      FROM "car" c
      WHERE c.user_id = (
        SELECT id
        FROM "user"
        WHERE public_id = ${publicId}
      )
    ) AS amount_car
`;
  return camelcaseKeys(query);
};

// * FILTER =======
// ? Brand =======
export const GETFilterPublicBrand = async ({
  brand,
  limit,
  offset,
}: any) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
  }>`
    SELECT
    c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, c.status
      FROM "car" c
    WHERE c.brand = ${brand}
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"
      WHERE brand = ${brand}
    `;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};

export const GETFilterBrand = async ({
  publicId,
  brand,
  limit,
  offset,
}: any) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
  }>`
    SELECT
    c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, c.status
      FROM "car" c
    WHERE c.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId}) AND c.brand = ${brand}
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"
    WHERE user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})
      AND brand = ${brand}
    `;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};

// ? Model =======
export const GETFilterModel = async ({
  publicId,
  model,
  limit,
  offset,
}: any) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
  }>`
    SELECT c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, r.status
      FROM "car" c
      JOIN "rental" r ON (r.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId}))
    WHERE c.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId}) AND c.model = ${model}
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"
    WHERE user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};

// ? Brand And Model =======
export const GETFilterBrandAndModel = async ({
  publicId,
  brand,
  model,
  limit,
  offset,
}: any) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
  }>`
    SELECT c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, r.status
      FROM "car" c
      JOIN "rental" r ON (r.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId}))
    WHERE c.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId}) 
      AND c.brand = ${brand} AND c.model = ${model}
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"
    WHERE user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};

// * CAR LIST =======
type TGETCarList = {
  publicId: string | undefined;
  limit: number;
  offset: number;
};
export const GETCarList = async ({ publicId, limit, offset }: TGETCarList) => {
  const query = await prisma.$queryRaw<{
    brand: string;
    model: string;
    plate_number: string;
    daily_rate: string;
    pb_id: string;
    status_request: string;
  }>`
    SELECT
    c.brand, c.model, c.plate_number, c.daily_rate, c.pb_id, c.status, cr.status AS status_request
      FROM "car" c
    JOIN "rental" r ON (r.car_id = c.id)
    JOIN "car_return" cr ON (cr.rental_id = r.id)
    WHERE c.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})
    ORDER BY c.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM "car"
    WHERE user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};
