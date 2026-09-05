/*
  Warnings:

  - The primary key for the `car_return` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "car_return_id_key";

-- AlterTable
ALTER TABLE "car_return" DROP CONSTRAINT "car_return_pkey",
ADD CONSTRAINT "car_return_pkey" PRIMARY KEY ("id");
