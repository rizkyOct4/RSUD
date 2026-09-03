import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";

type TPOSTUserProviderCarParam = {
  publicId: string | undefined;
  pbId: string;
  brand: string;
  model: string;
  plateNumber: string;
  dailyRate: number;
  createdAt: Date;
};

export const POSTUserProviderCar = async ({
  publicId,
  pbId,
  brand,
  model,
  plateNumber,
  dailyRate,
  createdAt,
}: TPOSTUserProviderCarParam) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // ! CAR DATABASE
    const [carId] = await tx.$queryRaw<{ id: string }[]>`
      INSERT INTO "car" (brand, model, plate_number, daily_rate, created_at, updated_at, pb_id)
        VALUES
      (${brand}, ${model}, ${plateNumber}, ${dailyRate}, ${createdAt}, ${createdAt}, ${pbId})
      RETURNING id
      `;

    // ! CAR RENTAL DATABASE
    await tx.$executeRaw`
        INSERT INTO "rental" (user_id, car_id)
            VALUES
        ((SELECT id FROM "user" WHERE public_id = ${publicId}), ${carId.id}::uuid )
    `;
  });
};
