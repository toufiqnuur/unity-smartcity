import { FastifyPluginAsync } from "fastify";
import { login, me, refreshToken, register, logout } from "../../controllers/auth.js";
import { loginSchema, meSchema, registerSchema } from "../../schema/auth.js";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/register", { schema: registerSchema }, register);
  fastify.post("/login", { schema: loginSchema }, login);
  fastify.get("/me", { schema: meSchema, onRequest: fastify.authenticate }, me);
  fastify.post("/refresh-token", refreshToken);
  fastify.post("/logout", logout);
};

export default auth;
