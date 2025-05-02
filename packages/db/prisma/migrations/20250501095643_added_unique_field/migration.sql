/*
  Warnings:

  - A unique constraint covering the columns `[joiningId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_joiningId_key" ON "Room"("joiningId");
