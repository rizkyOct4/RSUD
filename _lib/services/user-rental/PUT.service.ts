import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import camelcaseKeys from "camelcase-keys";

type TPUTCarReturnServiceParam = {
  publicId: string | undefined;
  carId: string;
  id: string;
  plateNumber: string;
  returnDate: Date;
};

export const PUTCarReturnService = async ({
  publicId,
  carId,
  id,
  plateNumber,
  returnDate,
}: TPUTCarReturnServiceParam) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // ! VALIDATE
    const [carReturn] = await tx.$queryRaw<{ id: string; rental_id: string }[]>`
        SELECT id, rental_id
            FROM "car_return" 
        WHERE id = ${id}::uuid
            AND rental_user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
        FOR UPDATE
        `;

    if (!carReturn) {
      throw new Error("Data Not Found");
    }

    const [rental] = await tx.$queryRaw<{ id: string; user_id: string }[]>`
        SELECT id, user_id
            FROM "rental" 
        WHERE id = ${carReturn.rental_id}::uuid
            AND user_id_rental = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
        FOR UPDATE
        `;

    if (!rental) {
      throw new Error("Data Not Found");
    }

    const [car] = await tx.$queryRaw<{ user_id: string }[]>`
        SELECT user_id
            FROM "car"
        WHERE pb_id = ${carId} AND plate_number = ${plateNumber}
        FOR UPDATE
    `;

    if (!car) {
      throw new Error("Data Not Found");
    }

    // ! UPDATE CAR RETURN DATABASE
    await tx.$executeRaw`
    UPDATE "car"
        SET status = 'RETURNED'::"CarStatus"
    WHERE user_id = ${car.user_id}::uuid AND plate_number = ${plateNumber} AND pb_id = ${carId}
    `;

    // ! UPDATE CAR RETURN DATABASE
    await tx.$executeRaw`
    UPDATE "car_return"
        SET return_date = ${returnDate}, status = 'REQUEST'::"CarReturnStatus"
    WHERE id = ${id}::uuid AND rental_user_id = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid
    `;

    // ! UPDATE RENTAL DATABASE
    await tx.$executeRaw`
        UPDATE "rental"
            SET status = 'RETURNED'::"RentalStatus"
        WHERE id = ${carReturn.rental_id}::uuid
            AND user_id_rental = (SELECT id FROM "user" WHERE public_id = ${publicId})::uuid`;
  });
};
