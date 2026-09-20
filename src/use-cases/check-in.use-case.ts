import type { CheckIn } from "../generated/prisma/client";
import type { CheckInRepository } from "../repositories/check-in-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInRpository: CheckInRepository) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInRpository.create({ userId, gymId })


        return { checkIn } 
    }
}