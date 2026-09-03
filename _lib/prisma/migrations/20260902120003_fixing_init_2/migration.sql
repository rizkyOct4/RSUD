/*
  Warnings:

  - You are about to drop the column `createdAt` on the `car_return` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `rental` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_return" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "rental" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
