-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LAW', 'CULTURE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'LAW',
ADD COLUMN     "featuredImage" TEXT;
