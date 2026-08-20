import type { FastifyReply, FastifyRequest } from "fastify"; 
import z from "zod";
import { RegisterUseCase } from "../../use-cases/register.use-case";
import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository.prisma";

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerUserInputDTO = z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(50),
    });    
    
    const { name, email, password } = registerUserInputDTO.parse(req.body);
    const userRepository = new UserRepositoryPrisma()
    const registerUseCase = new RegisterUseCase(userRepository)
   
    try {
        await registerUseCase.execute({
            name,
            email,
            password,
        });

        return res.status(201).send({ message: "User registered successfully" });
    } catch {
        return res.status(409).send()
    }

}