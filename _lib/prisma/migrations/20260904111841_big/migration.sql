/*
  Warnings:

  - The values [ACTIVE,RENTED] on the enum `RentalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('ACTIVE', 'RENTED', 'RETURNED');

-- AlterEnum
BEGIN;
CREATE TYPE "RentalStatus_new" AS ENUM ('ONGOING', 'RETURNED');
ALTER TABLE "public"."rental" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "rental" ALTER COLUMN "status" TYPE "RentalStatus_new" USING ("status"::text::"RentalStatus_new");
ALTER TYPE "RentalStatus" RENAME TO "RentalStatus_old";
ALTER TYPE "RentalStatus_new" RENAME TO "RentalStatus";
DROP TYPE "public"."RentalStatus_old";
ALTER TABLE "rental" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
COMMIT;

-- AlterTable
ALTER TABLE "car" ADD COLUMN     "status" "CarStatus" DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "rental" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
