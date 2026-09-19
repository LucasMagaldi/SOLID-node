import type { User } from "../generated/prisma/client";
import type { UserRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User;
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}