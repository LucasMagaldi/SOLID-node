import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import type { UserRepository } from "../repositories/user-repository";
import { GetUserProfileUseCase } from "./get-user-profile.use-case";
import { hash } from "bcryptjs";

let userRepository: UserRepository
let sut: GetUserProfileUseCase

describe("Get user profile use case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it("should be able to get user profile", async () => {
        const mockUser = await userRepository.create({
            name: "John Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 6)
        })

        const userId = mockUser.id

        const { user } = await sut.execute({ userId })

        expect(user.email).toEqual(mockUser.email)
    })
})