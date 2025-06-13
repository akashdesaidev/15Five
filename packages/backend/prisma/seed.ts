import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Create a test organization
  const organization = await prisma.organization.create({
    data: {
      id: randomUUID(),
      name: '15Five Demo Organization',
    },
  });

  // Create an admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.admin,
      status: UserStatus.active,
      organizationId: organization.id,
    },
  });

  // Create departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'Engineering',
        organizationId: organization.id,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Product',
        organizationId: organization.id,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Sales',
        organizationId: organization.id,
      },
    }),
  ]);

  // Create teams for each department
  await Promise.all(
    departments.map((dept) =>
      prisma.team.create({
        data: {
          name: `${dept.name} Team`,
          departmentId: dept.id,
          organizationId: organization.id,
        },
      })
    )
  );

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 