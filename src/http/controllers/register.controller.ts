import type { FastifyReply, FastifyRequest } from "fastify"; 
import z from "zod";
import { UserAlreadyExistsError } from "../../use-cases/error/user-already-exists-error";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register.use-case";

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerUserInputDTO = z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(50),
    });    
    
    const { name, email, password } = registerUserInputDTO.parse(req.body);
    const registerUseCase = makeRegisterUseCase()
   
    try {
        await registerUseCase.execute({
            name,
            email,
            password,
        });

        return res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
        if(err instanceof UserAlreadyExistsError) return res.status(409).send({
            message: err.message
        })


        throw err
    }
}