/*
  Warnings:

  - You are about to alter the column `date` on the `_moments` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__moments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "images" TEXT NOT NULL,
    "cretaed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new__moments" ("cretaed_at", "date", "id", "images", "title") SELECT "cretaed_at", "date", "id", "images", "title" FROM "_moments";
DROP TABLE "_moments";
ALTER TABLE "new__moments" RENAME TO "_moments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
