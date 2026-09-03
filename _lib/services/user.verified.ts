import { cache } from "react";
import { prisma } from "../prisma/prisma-client";

export const GetUserVerified = cache(async (publicId: string | null, userModel: string | null) => {
  let verified = false;

  const user = await prisma.$queryRaw<{ public_id: string }[]>`
      SELECT public_id
      FROM "user"
      WHERE public_id = ${publicId} AND user_model = ${userModel}::"UserModel"
      LIMIT 1
    `;

  if (!user[0]) {
    verified = false;
  } else {
    verified = true;
  }

  return verified;
});
