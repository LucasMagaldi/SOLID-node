import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in.use-case";
import { randomUUID } from "node:crypto";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory-gym.repository";
import { Decimal } from "@prisma/client/runtime/client";

    let checkInRepository: InMemoryCheckInRepository;
    let gymRepository: InMemoryGymRepository;
    let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInUseCase(checkInRepository, gymRepository);

        vi.useFakeTimers();

        gymRepository.itens.push({
            id: "gym-id-01",
            latitude: new Decimal("854.3423"),
            longitude: new Decimal("4334.434"),
            name: "Mock Gym",
            phone: "41 83934012",
            createdAt: new Date()
        })
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it("Should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: randomUUID(),
            gymId: "gym-id-01",
            userLatitude: 0.1233,
            userLongitude: 743.4352
        }) 

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not be able to checkin twice at same day", async () => {
        await sut.execute({
            userId: "user-id-01",
            gymId: "gym-id-01",
            userLatitude: 0.1233,
            userLongitude: 743.4352
        });

        await expect(() => sut.execute({
            userId: "user-id-01",
            gymId: "gym-id-01",
            userLatitude: 0.1233,
            userLongitude: 743.4352
        })).rejects.toBeInstanceOf(Error);
    })

    it("Should be able to checkin twice at diferent days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        await sut.execute({
            userId: "user-id-01",
            gymId: "gym-id-01",
            userLatitude: 0.1233,
            userLongitude: 743.4352
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: "user-id-01",
            gymId: "gym-id-01",
            userLatitude: 0.1233,
            userLongitude: 743.4352
        });

        expect(checkIn.id).toEqual(expect.any(String))
    })
})