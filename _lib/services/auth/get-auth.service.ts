import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";
import { nanoid } from "nanoid";



export const GETAuthProfile = async ({ publicId }: {publicId: string}) => {
  const query = await prisma.$queryRaw<{ user_model: string }[]>`
        SELECT user_model
            FROM "user"
        WHERE public_id = ${publicId}
        LIMIT 1
    `;

  if (!query[0]) {
    throw new Error("Data Not Found!");
  }

  return camelcaseKeys(query);
};
