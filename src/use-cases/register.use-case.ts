/* eslint-disable no-unused-vars */
import { hash } from "bcryptjs";
import type { UserRepository } from "../repositories/user-repository";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({
    name,
    email,
    password
    }: RegisterUseCaseRequest) {
        const hash_password = await hash(password, 10);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error("User with this email already exists");
        }

        await this.userRepository.create({
            name,
            email,
            password: hash_password
        })
    }
}