import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // Users
  const users = [
    {
      email: 'user1@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      height: 180,
      weight: 75.5,
      age: 30,
    },
    {
      email: 'user2@example.com',
      password: 'password123',
      firstName: 'Yessine',
      lastName: 'Agrebi',
      height: 175,
      weight: 50.5,
      age: 25,
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // Programs
  const programs = [
    {
      programName: 'Strength Training Program',
      description: 'A program focused on building strength and muscle mass.',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-30'),
      userId: 1, // Assuming user with ID 1 exists
    },
    {
      programName: 'Push Pull Legs Program',
      description: 'A program focused on building strength and muscle mass.',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-30'),
      userId: 1, // Assuming user with ID 1 exists
    },
    {
      programName: 'Weight Loss Program',
      description: 'A program focused on losing weight.',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-30'),
      userId: 1, // Assuming user with ID 1 exists
    },
    
  ];

  for (const program of programs) {
    await prisma.program.create({ data: program });
  }

  // Exercises
  const exercises = [
    {
      exerciseName: 'Squats',
      bodyPart: 'Legs',
      equipment: 'Barbell',
      userId: 1, // Assuming user with ID 1 exists
    },
    {
      exerciseName: 'Deadlifts',
      bodyPart: 'Back',
      equipment: 'Barbell',
      userId: 1, // Assuming user with ID 1 exists
    },
    {
      exerciseName: 'Bech Press',
      bodyPart: 'Chest',
      equipment: 'Barbell',
      userId: 1, // Assuming user with ID 1 exists
    },
    {
      exerciseName: 'Hammer Curls',
      bodyPart: 'Biceps',
      equipment: 'Dumbbell',
      userId: 1, // Assuming user with ID 1 exists
    }
  ];

  for (const exercise of exercises) {
    await prisma.exercise.create({ data: exercise });
  }

  // Workouts
  const workouts = [
    {
      programId: 1, 
      exerciseId: 1,
      date: new Date('2023-10-06'),
    },
    {
      programId: 1, // Assuming program with ID 1 exists
      exerciseId: 2, // Assuming exercise with ID 1 exists
      date: new Date('2023-10-06'),

    },
    {
      programId: 1, // Assuming program with ID 1 exists
      exerciseId: 3, // Assuming exercise with ID 1 exists
      date: new Date('2023-10-06'),

    },
    {
      programId: 1, // Assuming program with ID 1 exists
      exerciseId: 4, // Assuming exercise with ID 1 exists
      date: new Date('2023-10-06'),
    }
  ];

  for (const workout of workouts) {
    await prisma.workout.create({ data: workout });
  }

  // Sets
  const sets = [
    {
      reps: 10,
      weight: 50,
      setNum: 1,
      workoutId: 1, 
    },
    {
      reps: 10,
      weight: 55,
      setNum: 2,
      workoutId: 1, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 3,
      workoutId: 1, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 1,
      workoutId: 2, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 2,
      workoutId: 2, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 1,
      workoutId: 3, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 2,
      workoutId: 3, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 1,
      workoutId: 4, 
    },
    {
      reps: 10,
      weight: 60,
      setNum: 2,
      workoutId: 4, 
    },
  ];

  for (const set of sets) {
    await prisma.set.create({ data: set });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
