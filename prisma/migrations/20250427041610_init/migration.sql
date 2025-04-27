-- CreateTable
CREATE TABLE "Yarn" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorFamily" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "care" TEXT,
    "lot" TEXT,
    "notes" TEXT,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "Yarn_pkey" PRIMARY KEY ("id")
);
