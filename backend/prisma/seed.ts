import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Michiel van der Gragt",
        email: "michiel.vandergragt@sundsgarden.se",
        address: "Bäckamansgatan 6",
        postalcode: 25230,
        city: "Helsingborg",
        phone: "0733770064",
        admin: true,
      },
      {
        name: "Anna Svensson",
        email: "anna.svensson@example.com",
        address: "Storgatan 12",
        postalcode: 21122,
        city: "Malmö",
        phone: "0701234567",
        admin: false,
      },
      {
        name: "Erik Johansson",
        email: "erik.johansson@example.com",
        address: "Linnégatan 5",
        postalcode: 41104,
        city: "Göteborg",
        phone: "0702345678",
        admin: false,
      },
      {
        name: "Sara Lindberg",
        email: "sara.lindberg@example.com",
        address: "Drottninggatan 20",
        postalcode: 11151,
        city: "Stockholm",
        phone: "0703456789",
        admin: false,
      },
      {
        name: "Oskar Nilsson",
        email: "oskar.nilsson@example.com",
        address: "Kungsportsavenyen 10",
        postalcode: 41136,
        city: "Göteborg",
        phone: "0704567890",
        admin: false,
      },
      {
        name: "Elin Karlsson",
        email: "elin.karlsson@example.com",
        address: "Södra Förstadsgatan 8",
        postalcode: 21143,
        city: "Malmö",
        phone: "0705678901",
        admin: false,
      },
      {
        name: "Johan Andersson",
        email: "johan.andersson@example.com",
        address: "Vasagatan 15",
        postalcode: 11120,
        city: "Stockholm",
        phone: "0706789012",
        admin: false,
      },
      {
        name: "Emma Berg",
        email: "emma.berg@example.com",
        address: "Nygatan 3",
        postalcode: 25220,
        city: "Helsingborg",
        phone: "0707890123",
        admin: false,
      },
    ],
  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
