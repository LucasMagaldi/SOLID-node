import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";
import type { User } from "../generated/prisma/client";
import type { UserRepository } from "../repositories/user-repository";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
};

export class AuthenticateUseCase {
    // eslint-disable-next-line no-unused-vars
    constructor(private userRepository: UserRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password);

        if(!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
    }
}
