import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";

// type TPOSTUserProviderCarParam = {
//   publicId: string | undefined;
//   pbId: string;
//   brand: string;
//   model: string;
//   plateNumber: string;
//   dailyRate: number;
//   createdAt: Date;
// };

export const POSTRentCar = async ({
  publicId,
  pbId,
  startDate,
  endDate,
  createdAt,
  totalDays,
  totalRent,
}: any) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const cStartDate = new Date(startDate);
    const cEndDate = new Date(endDate);
    const cCreatedAt = new Date(createdAt);

    const cTotalDays = Number(totalDays);
    const cTotalRent = Number(totalRent);

    const [carOwner] = await tx.$queryRaw<{ id: string; user_id: string }[]>`
        SELECT id, user_id
        FROM "car"
        WHERE pb_id = ${pbId}
        FOR UPDATE
    `;

    if (!carOwner) {
      throw new Error("Authorization");
    }

    // ! UPDATE STATUS CAR DATABASE
    await tx.$executeRaw`
        UPDATE "car"
            SET status = 'RENTED'::"CarStatus"
        WHERE id = ${carOwner.id}::uuid AND pb_id = ${pbId}
    `;

    // ! INSERT RENT DATABASE
    const [rentalId] = await tx.$queryRaw<{ id: string }[]>`
        INSERT INTO "rental" (user_id, car_id, start_date, end_date, created_at, updated_at, user_id_rental)
            VALUES
        (${carOwner.user_id}::uuid, ${carOwner.id}::uuid, ${cStartDate}, ${cEndDate}, ${cCreatedAt}, ${cCreatedAt}, (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid)
        RETURNING id
    `;

    // ! INSERT PENDING CAR RETURN
    await tx.$executeRaw`
        INSERT INTO "car_return" (rental_id, total_days, total_cost, rental_user_id)
            VALUES
        (${rentalId.id}::uuid, ${cTotalDays}, ${cTotalRent}, ${carOwner.user_id}::uuid)
    `;
  });
};
