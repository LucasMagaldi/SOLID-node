import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new AuthenticateUseCase(userRepository);
    })

    it("should be able to authenticate an user", async () => {
        await userRepository.create({
            name: "John Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 6)
        });

        const { user } = await sut.execute({
            email: "joedoe@gmail.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    })

    it("should not be able to authenticate with wrong email", async () => {
        await userRepository.create({
            name: "John Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 6)
        });

        await expect(() => sut.execute({
            email: "wrong-email@gmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

    it("should not be able to authenticate with wrong password", async () => {
        await userRepository.create({
            name: "John Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 6)
        });

        await expect(() => sut.execute({
            email: "joedoe@gmail.com",
            password: "wrong-password"
        })).rejects.toBeInstanceOf(InvalidCredentialsError);

    })
})

