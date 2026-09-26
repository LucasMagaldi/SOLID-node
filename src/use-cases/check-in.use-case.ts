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
        const checkInDate = new Date();
        const isAlreadyCheckIn = await this.checkInRpository.findByUserOnDate(userId, checkInDate);
        
        if(isAlreadyCheckIn) throw new Error
        const checkIn = await this.checkInRpository.create({ userId, gymId });

        return { checkIn } 
    }
}