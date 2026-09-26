import type { CheckIn } from "../generated/prisma/client";
import type { CheckInRepository } from "../repositories/check-in-repository";
import type { GymRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInRpository: CheckInRepository, 
        private gymRepository: GymRepository,
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
        console.log(userLatitude, userLongitude);
        const checkInDate = new Date();

        const isAlreadyCheckIn = await this.checkInRpository.findByUserOnDate(userId, checkInDate);
        const isGymExists = await this.gymRepository.findById(gymId);

        if(!isGymExists) throw new ResourceNotFoundError() 

        if(isAlreadyCheckIn) throw new Error
        const checkIn = await this.checkInRpository.create({ userId, gymId });

        return { checkIn } 
    }
}