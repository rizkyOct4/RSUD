-- DropForeignKey
ALTER TABLE "car_return" DROP CONSTRAINT "car_return_rental_id_fkey";

-- DropForeignKey
ALTER TABLE "rental" DROP CONSTRAINT "rental_car_id_fkey";

-- DropForeignKey
ALTER TABLE "rental" DROP CONSTRAINT "rental_user_id_fkey";

-- AlterTable
ALTER TABLE "rental" ADD COLUMN     "user_id_rental" UUID,
ALTER COLUMN "created_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_return" ADD CONSTRAINT "car_return_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
