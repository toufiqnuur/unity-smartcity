import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: (origin, cb) => {
      fastify.log.info(`CORS origin: ${origin}`);

      if (!origin) {
        cb(null, true);
        return;
      }

      try {
        const hostname = new URL(origin).hostname;
        if (hostname === "localhost") {
          cb(null, true);
        } else {
          cb(new Error("Not allowed"), false);
        }
      } catch (err) {
        cb(new Error("Invalid origin"), false);
      }
    },

    credentials: true,
  });
});
