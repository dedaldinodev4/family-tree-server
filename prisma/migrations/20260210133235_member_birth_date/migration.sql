/*
  Warnings:

  - You are about to alter the column `birthDate` on the `_members` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "birthDate" DATETIME,
    "phone" TEXT,
    "photo" TEXT,
    "role" TEXT,
    "cretaed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new__members" ("birthDate", "cretaed_at", "id", "name", "parentId", "phone", "photo", "role") SELECT "birthDate", "cretaed_at", "id", "name", "parentId", "phone", "photo", "role" FROM "_members";
DROP TABLE "_members";
ALTER TABLE "new__members" RENAME TO "_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
