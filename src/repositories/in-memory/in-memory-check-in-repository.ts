import { randomUUID } from "node:crypto";
import type { CheckIn } from "../../generated/prisma/client";
import type { CheckInUncheckedCreateInput } from "../../generated/prisma/models";
import type { CheckInRepository } from "../check-in-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
    public itens: CheckIn[] = []

    async create(data: CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
        }

        this.itens.push(checkIn)

        return checkIn
    }
}