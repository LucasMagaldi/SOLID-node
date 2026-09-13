import { randomUUID } from "node:crypto";
import type { User } from "../../generated/prisma/client";
import type { UserCreateInput } from "../../generated/prisma/models";
import type { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = [];

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email);

        return user ?? null;
    }

    async create(data: UserCreateInput) {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.items.push(user);

        return user;
    }
}
