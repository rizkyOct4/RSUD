import { prisma } from "@/_lib/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";
import { nanoid } from "nanoid";

// * OAuth =================
export const OAuthRegister = async ({
  email,
  fullname,
  imageUrl,
  createdAt,
}: {
  email: string;
  fullname?: string | undefined;
  imageUrl?: string | undefined;
  createdAt?: Date;
}) => {
  const queryCheck = await prisma.$queryRaw<{ email: string }[]>`
        SELECT email FROM users WHERE email = ${email}`;

  const publicId = nanoid(8);

  if (queryCheck.length < 1) {
    // ! USERS DATABASE
    await prisma.$executeRaw`
        INSERT INTO user (name, email, image_url, public_id, created_at, user_type)
          VALUES 
        (${fullname}, ${email}, ${imageUrl}, ${publicId}, ${createdAt}, 'REGULAR'::"UserType")`;

    // // ! USERS SETTING
    // await prisma.$executeRaw`
    //   INSERT INTO user_settings (created_at)
    //     VALUES
    //   (${createdAt})
    // `;
  }

  const result = await prisma.$queryRaw<
    { created_at: Date; public_id: string; image_url: string }[]
  >`
      SELECT created_at, public_id, image_url
      FROM users WHERE email = ${email}`;

  return camelcaseKeys(result);
};

// * Credential Register ============
export const CredentialRegister = async ({
  name,
  address,
  phoneNumber,
  sim,
  password,
  userModel,
  createdAt,
}: {
  name: string;
  address: string;
  phoneNumber: string;
  sim: string;
  password: string;
  userModel: string;
  createdAt: Date;
}) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const publicId = nanoid(8);

    // ! USER
    await tx.$executeRaw`
      INSERT INTO "user" (public_id, name, address, phone_number, license_number, password, created_at, updated_at, user_model) 
        VALUES 
      (${publicId}, ${name}, ${address}, ${phoneNumber}, ${sim}, ${passwordHash}, ${createdAt}, ${createdAt}, ${userModel}::"UserModel")
      `;
  });
};

// * Credential Login ============
export const CredentialsLogin = async ({
  sim,
  password,
}: {
  sim: any;
  password: any;
}) => {

  const userCheck = await prisma.$queryRaw<
    {
      public_id: string;
      license_number: string;
      password: string;
      name: string;
      created_at: Date;
      user_model: string;
    }[]
  >`
    SELECT public_id, license_number, password, name, created_at , user_model
      FROM "user"
    WHERE license_number = ${sim}::text
    `;

  if (userCheck.length === 0) {
    throw new Error("INVALID_SIM");
  }

  const passwordMatch = await bcrypt.compare(password, userCheck[0].password);

  if (!passwordMatch) {
    throw new Error("INVALID_PASSWORD");
  }

  const rawData = {
    publicId: userCheck[0].public_id,
    sim: userCheck[0].license_number,
    name: userCheck[0].name,
    createdAt: userCheck[0].created_at,
    userModel: userCheck[0].user_model,
  };

  return {
    success: true,
    user: camelcaseKeys(rawData),
  };
};

// * Cookies ============
type TAuthCookiesData = {
  currency: string;
  locale: string;
  timezome: string;
  theme: string;
  created_at: Date;
  updated_at: Date | null;
  default_transaction: string;
  start_of_week: string;
};

type TGETAuthCookies = {
  publicId: string;
};
export const GETAuthCookies = async ({ publicId }: TGETAuthCookies) => {
  const query = await prisma.$queryRaw<TAuthCookiesData[]>`
        SELECT currency, locale, timezone, theme, created_at, 
        updated_at, default_transaction, start_of_week
            FROM user_settings us
        WHERE user_id = (
            SELECT id FROM users WHERE public_id = ${publicId}
        )
    `;

  return camelcaseKeys(query);
};

// export const saltAndHashPassword = async (password: string, email: string) => {
//   const userCheck = await prisma.$queryRaw<
//     {
//       public_id: string;
//       email: string;
//       password: string;
//       name: string;
//       created_at: Date;
//     }[]
//   >`
//     SELECT public_id, email, password, name, created_at
//       FROM users
//     WHERE email = ${email}`;

//   const passwordMatch = await bcrypt.compare(password, userCheck[0].password);

//   return passwordMatch;
// };
