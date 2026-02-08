-- CreateTable
CREATE TABLE "_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "birthDate" TEXT,
    "phone" TEXT,
    "photo" TEXT,
    "cretaed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_moments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "cretaed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
