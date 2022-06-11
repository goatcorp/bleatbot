-- CreateTable
CREATE TABLE "AutomaticTasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "performAt" DATETIME NOT NULL,
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL
);
