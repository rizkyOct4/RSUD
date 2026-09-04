/*
  Warnings:

  - The primary key for the `car_return` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `car_return` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "car_return_rental_id_key";

-- DropIndex
DROP INDEX "car_return_rental_user_id_key";

-- AlterTable
ALTER TABLE "car_return" DROP CONSTRAINT "car_return_pkey",
ADD CONSTRAINT "car_return_pkey" PRIMARY KEY ("rental_id");

-- CreateIndex
CREATE UNIQUE INDEX "car_return_id_key" ON "car_return"("id");
