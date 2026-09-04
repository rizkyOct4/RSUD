-- CreateEnum
CREATE TYPE "CarReturnStatus" AS ENUM ('REQUEST', 'CONFIRM');

-- AlterTable
ALTER TABLE "car_return" ADD COLUMN     "status" "CarReturnStatus";
