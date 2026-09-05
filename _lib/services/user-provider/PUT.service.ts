import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";

export const PUTCarReturnService = async ({
  publicId,
  pbId,
  status,
  confirmReturnDate,
}: any) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // ! VALIDATE
    const [carOwner] = await tx.$queryRaw<
      { user_id: string; car_return_id: string }[]
    >`
        SELECT c.user_id, cr.id AS car_return_id
        FROM "car" c
        JOIN "rental" r ON (r.user_id = c.user_id)
        JOIN "car_return" cr ON (cr.rental_id = r.id)
        WHERE c.user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
        AND cr.status = 'REQUEST'::"CarReturnStatus" AND c.pb_id = ${pbId}
        FOR UPDATE
        `;

    if (!carOwner) {
      throw new Error("Unauthorized");
    }

    // * UPDATE CAR RETURN DATABASE
    await tx.$executeRaw`
        UPDATE car_return
            SET status = 'CONFIRM'::"CarReturnStatus", confirm_return_date = ${confirmReturnDate}
        WHERE id = ${carOwner.car_return_id}::uuid AND owner_user_id = ${carOwner.user_id}::uuid
    `;
  });
};
