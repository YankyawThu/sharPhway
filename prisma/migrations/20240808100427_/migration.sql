-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT,
    "base_amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "sell" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fyi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fyi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "img1" TEXT,
    "img2" TEXT,
    "img3" TEXT,
    "img4" TEXT,
    "img5" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
