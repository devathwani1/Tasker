-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "repeat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekDays" TEXT[];
