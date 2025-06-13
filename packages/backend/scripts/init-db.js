const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Create test organization
    const organization = await prisma.organization.create({
      data: {
        name: 'Test Organization',
      },
    });

    console.log('Created organization:', organization);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        organizationId: organization.id,
        hireDate: new Date(),
      },
    });

    console.log('Created admin user:', admin);

    // Create HR user
    const hr = await prisma.user.create({
      data: {
        email: 'hr@example.com',
        firstName: 'HR',
        lastName: 'Manager',
        role: 'HR',
        organizationId: organization.id,
        hireDate: new Date(),
      },
    });

    console.log('Created HR user:', hr);

    // Create departments
    const engineering = await prisma.department.create({
      data: {
        name: 'Engineering',
        organizationId: organization.id,
      },
    });

    const sales = await prisma.department.create({
      data: {
        name: 'Sales',
        organizationId: organization.id,
      },
    });

    console.log('Created departments:', { engineering, sales });

    // Create teams
    const frontend = await prisma.team.create({
      data: {
        name: 'Frontend',
        departmentId: engineering.id,
      },
    });

    const backend = await prisma.team.create({
      data: {
        name: 'Backend',
        departmentId: engineering.id,
      },
    });

    const enterprise = await prisma.team.create({
      data: {
        name: 'Enterprise',
        departmentId: sales.id,
      },
    });

    console.log('Created teams:', { frontend, backend, enterprise });

    // Create team managers
    const engineeringManager = await prisma.user.create({
      data: {
        email: 'eng.manager@example.com',
        firstName: 'Engineering',
        lastName: 'Manager',
        role: 'MANAGER',
        organizationId: organization.id,
        hireDate: new Date(),
      },
    });

    const salesManager = await prisma.user.create({
      data: {
        email: 'sales.manager@example.com',
        firstName: 'Sales',
        lastName: 'Manager',
        role: 'MANAGER',
        organizationId: organization.id,
        hireDate: new Date(),
      },
    });

    console.log('Created managers:', { engineeringManager, salesManager });

    // Create employees
    const employees = await Promise.all([
      prisma.user.create({
        data: {
          email: 'frontend.dev@example.com',
          firstName: 'Frontend',
          lastName: 'Developer',
          role: 'EMPLOYEE',
          organizationId: organization.id,
          currentManagerId: engineeringManager.id,
          hireDate: new Date(),
        },
      }),
      prisma.user.create({
        data: {
          email: 'backend.dev@example.com',
          firstName: 'Backend',
          lastName: 'Developer',
          role: 'EMPLOYEE',
          organizationId: organization.id,
          currentManagerId: engineeringManager.id,
          hireDate: new Date(),
        },
      }),
      prisma.user.create({
        data: {
          email: 'sales.rep@example.com',
          firstName: 'Sales',
          lastName: 'Representative',
          role: 'EMPLOYEE',
          organizationId: organization.id,
          currentManagerId: salesManager.id,
          hireDate: new Date(),
        },
      }),
    ]);

    console.log('Created employees:', employees);

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 