import type { CheckInRepository } from "../check-in-repository";
import type { CheckInUncheckedCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn
    }
}