/*
  Warnings:

  - You are about to drop the column `created_at` on the `car_return` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rental_user_id]` on the table `car_return` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rental_user_id` to the `car_return` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_return" DROP COLUMN "created_at",
ADD COLUMN     "rental_user_id" UUID NOT NULL,
ALTER COLUMN "return_date" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "car_return_rental_user_id_key" ON "car_return"("rental_user_id");

-- AddForeignKey
ALTER TABLE "car_return" ADD CONSTRAINT "car_return_rental_user_id_fkey" FOREIGN KEY ("rental_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
