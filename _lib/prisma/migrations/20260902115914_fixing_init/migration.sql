/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarReturn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarReturn" DROP CONSTRAINT "CarReturn_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_carId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_userId_fkey";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "CarReturn";

-- DropTable
DROP TABLE "Rental";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "daily_rate" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_return" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rental_id" UUID NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "total_days" INTEGER NOT NULL,
    "total_cost" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_return_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_license_number_key" ON "user"("license_number");

-- CreateIndex
CREATE INDEX "user_name_idx" ON "user"("name");

-- CreateIndex
CREATE INDEX "user_phone_number_idx" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "car_plate_number_key" ON "car"("plate_number");

-- CreateIndex
CREATE INDEX "car_brand_idx" ON "car"("brand");

-- CreateIndex
CREATE INDEX "car_model_idx" ON "car"("model");

-- CreateIndex
CREATE INDEX "car_id_created_at_idx" ON "car"("id", "created_at");

-- CreateIndex
CREATE INDEX "rental_user_id_idx" ON "rental"("user_id");

-- CreateIndex
CREATE INDEX "rental_car_id_idx" ON "rental"("car_id");

-- CreateIndex
CREATE INDEX "rental_start_date_end_date_idx" ON "rental"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "rental_status_idx" ON "rental"("status");

-- CreateIndex
CREATE UNIQUE INDEX "car_return_rental_id_key" ON "car_return"("rental_id");

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_return" ADD CONSTRAINT "car_return_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
