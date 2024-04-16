-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "AnimaSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "AnimalAge" AS ENUM ('YOUNG', 'ADULT', 'AGED');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AnimalAmbient" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "Animal" NOT NULL,
    "size" "AnimaSize" NOT NULL,
    "age" "AnimalAge" NOT NULL,
    "independence_level" "IndependenceLevel" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "ambient" "AnimalAmbient" NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
