import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in.use-case";
import { randomUUID } from "node:crypto";

    let checkInRepository: InMemoryCheckInRepository;
    let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInUseCase(checkInRepository);
    })

    it("Should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: randomUUID(),
            gymId: randomUUID()
        }) 

        expect(checkIn.id).toEqual(expect.any(String))
    })
})