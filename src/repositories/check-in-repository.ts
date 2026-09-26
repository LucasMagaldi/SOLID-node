import type { CheckIn } from "../generated/prisma/client";
import type { CheckInUncheckedCreateInput } from "../generated/prisma/models";

export interface CheckInRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null>
}