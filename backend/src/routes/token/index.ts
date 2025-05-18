import { FastifyPluginAsync } from "fastify";
import {
  generateTokenHandler,
  redeemTokenHandler,
  validateTokenHandler,
} from "../../controllers/token.js";
import { generateTokenSchema, redeemTokenSchema, validateTokenSchema } from "../../schema/token.js";

const token: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/generate", { schema: generateTokenSchema }, generateTokenHandler);
  fastify.post("/validate", { schema: validateTokenSchema }, validateTokenHandler);
  fastify.post(
    "/redeem",
    { schema: redeemTokenSchema, onRequest: fastify.authenticate },
    redeemTokenHandler
  );
};

export default token;
