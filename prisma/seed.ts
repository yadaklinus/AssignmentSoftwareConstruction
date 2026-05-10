import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const departments = [
  "Computer Science",
  "Business Administration",
  "Engineering",
  "Social Sciences",
  "Medicine",
  "Law",
  "Arts and Humanities",
  "Environmental Science",
];

const restaurants = ["Polygon", "Ready-Rides"];
const genders = ["Male", "Female", "Other"];

async function main() {
  console.log("Seeding started...");

  // Clear existing data
  await prisma.surveyResponse.deleteMany();

  const responses = [];

  for (let i = 0; i < 110; i++) {
    const restaurantChoice = faker.helpers.arrayElement(restaurants);
    const gender = faker.helpers.arrayElement(genders);
    const department = faker.helpers.arrayElement(departments);
    const reason = faker.lorem.sentences(2);

    responses.push({
      gender,
      department,
      restaurantChoice,
      reason,
    });
  }

  await prisma.surveyResponse.createMany({
    data: responses,
  });

  console.log(`Seeded ${responses.length} survey responses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
