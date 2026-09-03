/*
  Warnings:

  - A unique constraint covering the columns `[pb_id]` on the table `car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pb_id` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "pb_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "car_pb_id_key" ON "car"("pb_id");
