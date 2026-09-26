import type { Gym } from "../../generated/prisma/client";
import type { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public itens: Gym [] = []

    async findById(gymId: string): Promise<Gym | null> {
        const gym = this.itens.find((item) => item.id === gymId);

        return gym ?? null
    }
}