import type { UserCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import type { UserRepository } from "../user-repository";

export class UserRepositoryPrisma implements UserRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }

    async create(data: UserCreateInput) {
        const user = prisma.user.create({data});

        return user;
    }
}