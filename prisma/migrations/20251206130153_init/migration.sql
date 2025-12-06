-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "title" TEXT,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);
