import type { Gym } from "../generated/prisma/client";

export interface GymRepository {
    findById(gymId: string): Promise<Gym | null>
}