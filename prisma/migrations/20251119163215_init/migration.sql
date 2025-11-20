-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workAt" TIMESTAMP(3),
    "price" INTEGER,
    "thickness" INTEGER,
    "solutionType" INTEGER NOT NULL DEFAULT 0,
    "buildingType" INTEGER NOT NULL DEFAULT 0,
    "area" INTEGER NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
