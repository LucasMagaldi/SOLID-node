import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository.prisma";
import { AuthenticateUseCase } from "../authenticate.use-case";

export function makeAuthenticateUseCase() {
    const userRepository = new UserRepositoryPrisma();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    return authenticateUseCase
}