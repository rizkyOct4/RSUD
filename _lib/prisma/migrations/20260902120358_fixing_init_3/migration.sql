/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_public_id_key" ON "user"("public_id");
