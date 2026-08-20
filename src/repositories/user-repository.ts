/* eslint-disable no-unused-vars */
import type { User } from "../generated/prisma/client";
import type { UserCreateInput } from "../generated/prisma/models";

export interface UserRepository {
    create(data: UserCreateInput) : Promise<User>
    findByEmail(email: string): Promise<User | null>
} 