import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const services = [
  { name: "Taglio Donna", description: "Taglio personalizzato con lavaggio e asciugatura", price: 35.0, duration: 45, category: "Capelli" },
  { name: "Taglio Uomo", description: "Taglio classico o moderno con lavaggio", price: 20.0, duration: 30, category: "Capelli" },
  { name: "Colore", description: "Tinta completa con prodotti professionali", price: 55.0, duration: 90, category: "Capelli" },
  { name: "Mèches", description: "Schiariture a ciocche con tecnica avanzata", price: 70.0, duration: 120, category: "Capelli" },
  { name: "Piega", description: "Piega liscio o morbida con phon", price: 25.0, duration: 30, category: "Capelli" },
  { name: "Manicure", description: "Cura e smaltatura delle unghie", price: 25.0, duration: 30, category: "Unghie" },
  { name: "Pedicure", description: "Trattamento completo dei piedi", price: 35.0, duration: 40, category: "Unghie" },
  { name: "Maschera Viso", description: "Pulizia del viso con maschera idratante", price: 30.0, duration: 30, category: "Viso" },
];

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log(`Seeded ${services.length} services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
