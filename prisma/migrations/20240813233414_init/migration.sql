-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('PISTOL', 'SHOTGUN', 'MACHINEGUN', 'KNIFE');

-- CreateTable
CREATE TABLE "criminal" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,

    CONSTRAINT "criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime" (
    "id" UUID NOT NULL,
    "id_criminal" UUID NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arm" (
    "id" UUID NOT NULL,
    "model" "TYPE" NOT NULL DEFAULT 'PISTOL',
    "year" VARCHAR(4) NOT NULL,
    "trueBlade" BOOLEAN NOT NULL DEFAULT false,
    "ammunation" VARCHAR(5) NOT NULL,
    "id_crime" UUID NOT NULL,

    CONSTRAINT "arm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminal_cpf_key" ON "criminal"("cpf");

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_id_criminal_fkey" FOREIGN KEY ("id_criminal") REFERENCES "criminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arm" ADD CONSTRAINT "arm_id_crime_fkey" FOREIGN KEY ("id_crime") REFERENCES "crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
