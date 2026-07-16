import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({
    name,
    email,
    password
}: RegisterUseCaseRequest) {
    const hash_password = await hash(password, 10);

    const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
    })

    console.log(userWithSameEmail)

    if (userWithSameEmail) {
        throw new Error("User with this email already exists");
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hash_password,
        },
    });
}