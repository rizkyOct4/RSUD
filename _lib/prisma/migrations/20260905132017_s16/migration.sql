/*
  Warnings:

  - Added the required column `owner_user_id` to the `car_return` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_return" ADD COLUMN     "owner_user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "car_return" ADD CONSTRAINT "car_return_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
