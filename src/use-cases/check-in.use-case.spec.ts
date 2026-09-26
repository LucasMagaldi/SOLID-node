import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in.use-case";
import { randomUUID } from "node:crypto";

    let checkInRepository: InMemoryCheckInRepository;
    let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInUseCase(checkInRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it("Should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: randomUUID(),
            gymId: randomUUID()
        }) 

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not be able to checkin twice at same day", async () => {
        await sut.execute({
            userId: "user-id-01",
            gymId: randomUUID()
        });

        await expect(() => sut.execute({
            userId: "user-id-01",
            gymId: randomUUID()
        })).rejects.toBeInstanceOf(Error);
    })

    it("Should be able to checkin twice at diferent days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        await sut.execute({
            userId: "user-id-01",
            gymId: randomUUID()
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: "user-id-01",
            gymId: randomUUID()
        });

        expect(checkIn.id).toEqual(expect.any(String))
    })
})