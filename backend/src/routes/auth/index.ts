import { FastifyPluginAsync } from "fastify";
import {
  registerHandler,
  loginHandler,
  userProfileHandler,
  refreshTokenHandler,
  logoutHandler,
} from "../../controllers/auth.js";
import { loginSchema, meSchema, registerSchema } from "../../schema/auth.js";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/register", { schema: registerSchema }, registerHandler);
  fastify.post("/login", { schema: loginSchema }, loginHandler);
  fastify.get("/me", { schema: meSchema, onRequest: fastify.authenticate }, userProfileHandler);
  fastify.post("/refresh", { onRequest: fastify.authenticate }, refreshTokenHandler);
  fastify.post("/logout", { onRequest: fastify.authenticate }, logoutHandler);
};

export default auth;
