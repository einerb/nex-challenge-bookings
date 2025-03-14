import { GetAllRoomsUseCase } from '../../../src/application/use-cases/room/GetAllRoomsUseCase';
import { Room, RoomType, RoomView } from '../../../src/domain/entities';
import { RoomRepository } from '../../../src/domain/repositories/RoomRepository';

const mockRoomRepo = {
  findAvailable: jest.fn(),
};

describe('GetAllRoomsUseCase', () => {
  let getAllRoomsUseCase;

  beforeEach(() => {
    getAllRoomsUseCase = new GetAllRoomsUseCase(
      mockRoomRepo as unknown as RoomRepository,
    );
  });

  it('should return available rooms', async () => {
    const mockRooms: Room[] = [
      {
        id: '05e502ef-b6df-44d0-bc81-36e51d037b11',
        name: 'Room 1',
        type: RoomType.SINGLE,
        view: RoomView.INTERIOR,
        capacity: 2,
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        updateTimestamps: jest.fn(),
        softDelete: jest.fn(),
      },
      {
        id: '05e502ef-b6df-44d0-bc81-36e51d037b12',
        name: 'Room 2',
        type: RoomType.DOUBLE,
        view: RoomView.OUTSIDE,
        capacity: 4,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        updateTimestamps: jest.fn(),
        softDelete: jest.fn(),
      },
    ];
    mockRoomRepo.findAvailable.mockResolvedValue(mockRooms);

    const result = await getAllRoomsUseCase.execute(
      new Date('2025-05-10'),
      new Date('2025-05-12'),
      2,
      RoomType.SINGLE,
      RoomView.INTERIOR,
    );

    expect(result).toEqual(mockRooms);
    expect(mockRoomRepo.findAvailable).toHaveBeenCalledWith(
      new Date('2025-05-10'),
      new Date('2025-05-12'),
      2,
      RoomType.SINGLE,
      RoomView.INTERIOR,
    );
  });

  it('should return an empty array if no rooms are available', async () => {
    mockRoomRepo.findAvailable.mockResolvedValue([]);

    const result = await getAllRoomsUseCase.execute(
      new Date('2025-05-10'),
      new Date('2025-05-12'),
      2,
      RoomType.SINGLE,
      RoomView.INTERIOR,
    );

    expect(result).toEqual([]);
  });

  it('should throw an error if repository method fails', async () => {
    mockRoomRepo.findAvailable.mockRejectedValue(new Error('Database error'));

    await expect(
      getAllRoomsUseCase.execute(
        new Date('2025-05-10'),
        new Date('2025-05-12'),
        2,
        RoomType.SINGLE,
        RoomView.INTERIOR,
      ),
    ).rejects.toThrow('Database error');
  });
});
