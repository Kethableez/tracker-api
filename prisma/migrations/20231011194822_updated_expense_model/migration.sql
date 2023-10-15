/*
  Warnings:

  - You are about to drop the column `defaultCurrency` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "defaultCurrency",
ADD COLUMN     "hasDefaultCurrency" BOOLEAN NOT NULL DEFAULT true;
