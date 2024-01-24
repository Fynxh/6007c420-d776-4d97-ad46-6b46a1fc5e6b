-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REGULAR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'REGULAR';
