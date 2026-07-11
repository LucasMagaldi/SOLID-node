import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";

export async function routes(app: FastifyInstance) {
    app.post('/register', register)
}