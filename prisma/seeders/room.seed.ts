import { PrismaClient } from '@prisma/client';

export class RoomSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    await this.prisma.room.createMany({
      data: [
        // Rooms SINGLE (10)
        {
          name: 'Room 1',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 2',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 3',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 4',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 5',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 6',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 7',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 8',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 9',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },
        {
          name: 'Room 10',
          type: 'SINGLE',
          view: 'OUTSIDE',
          price: 60000,
          capacity: 1,
        },

        // Rooms DOUBLE (15)
        {
          name: 'Room 11',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 12',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 13',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 14',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 15',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 16',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 17',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 18',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 19',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 20',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 21',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 22',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 23',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 24',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },
        {
          name: 'Room 25',
          type: 'DOUBLE',
          view: 'OUTSIDE',
          price: 100000,
          capacity: 2,
        },

        // Rooms PRESIDENTIAL (5)
        {
          name: 'Room 26',
          type: 'PRESIDENTIAL',
          view: 'OUTSIDE',
          price: 160000,
          capacity: 4,
        },
        {
          name: 'Room 27',
          type: 'PRESIDENTIAL',
          view: 'OUTSIDE',
          price: 160000,
          capacity: 4,
        },
        {
          name: 'Room 28',
          type: 'PRESIDENTIAL',
          view: 'OUTSIDE',
          price: 160000,
          capacity: 4,
        },
        {
          name: 'Room 29',
          type: 'PRESIDENTIAL',
          view: 'OUTSIDE',
          price: 160000,
          capacity: 4,
        },
        {
          name: 'Room 30',
          type: 'PRESIDENTIAL',
          view: 'OUTSIDE',
          price: 160000,
          capacity: 4,
        },
      ],
      skipDuplicates: true,
    });
  }
}
