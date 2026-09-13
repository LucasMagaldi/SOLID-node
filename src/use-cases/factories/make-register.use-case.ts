import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository.prisma";
import { RegisterUseCase } from "../register.use-case";

export function makeRegisterUseCase() {
    const userRepository = new UserRepositoryPrisma();
    const registerUseCase = new RegisterUseCase(userRepository);

    return registerUseCase;
}