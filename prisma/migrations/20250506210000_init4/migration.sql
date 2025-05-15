/*
  Warnings:

  - Added the required column `pendingOn` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "States" AS ENUM ('COMPLEATED', 'PENDING', 'CANCELED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "pendingOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "state" "States" NOT NULL DEFAULT 'PENDING';
