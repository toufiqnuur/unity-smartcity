import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import { Xendit, Balance } from "xendit-node";
import * as dotenv from "dotenv";

dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    xendit: {
      balance: Balance;
      // Tambahkan client lain sesuai kebutuhan
    };
  }
}

const xenditPlugin: FastifyPluginAsync = async (fastify, options) => {
  const xenditClient = new Xendit({
    secretKey: process.env.XENDIT_API_KEY || "",
  });

  fastify.decorate("xendit", {
    balance: xenditClient.Balance,
  });

  // Tambahkan health check
  fastify.addHook("onReady", async () => {
    try {
      await xenditClient.Balance.getBalance({ accountType: "CASH" });
      fastify.log.info("Xendit connection OK");
    } catch (err) {
      fastify.log.error("Xendit connection failed");
      throw err;
    }
  });
};

export default fp(xenditPlugin, {
  name: "xendit",
});
