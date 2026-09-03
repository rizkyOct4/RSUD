/*
  Warnings:

  - Added the required column `user_model` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserModel" AS ENUM ('PROVIDER', 'CUSTOMER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_model" "UserModel" NOT NULL;
