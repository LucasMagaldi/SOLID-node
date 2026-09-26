import { randomUUID } from "node:crypto";
import type { CheckIn } from "../../generated/prisma/client";
import type { CheckInUncheckedCreateInput } from "../../generated/prisma/models";
import type { CheckInRepository } from "../check-in-repository";
import dayjs from "dayjs";

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

    async findByUserOnDate(userId: string, date: Date) {
        const checkInOnSameDate = this.itens.find((checkIn) => {
            const checkInDate = dayjs(checkIn.createdAt);
            const isCheckInOnSameDate = dayjs(checkInDate).isSame(date, "day");

            return checkIn.userId === userId && isCheckInOnSameDate;
        })

        if(!checkInOnSameDate) return null

        return checkInOnSameDate
    }
}