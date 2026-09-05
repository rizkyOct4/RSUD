/*
  Warnings:

  - You are about to alter the column `daily_rate` on the `car` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "car" ALTER COLUMN "daily_rate" SET DATA TYPE INTEGER;
