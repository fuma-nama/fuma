/*
  Warnings:

  - You are about to drop the column `threadId` on the `Comment` table. All the data in the column will be lost.
  - Made the column `page` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "threadId",
ADD COLUMN     "thread" INTEGER,
ALTER COLUMN "page" SET NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "userId" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "canDelete" BOOLEAN NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("userId")
);
