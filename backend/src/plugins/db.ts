import fp from "fastify-plugin";
import knex, { Knex } from "knex";
import type { FastifyPluginAsync } from "fastify";
import config from "../knexfile.js";

declare module "fastify" {
  interface FastifyInstance {
    knex: Knex;
  }
}

const knexPlugin: FastifyPluginAsync<Knex.Config> = async (fastify, options) => {
  if (!fastify.knex) {
    const db = knex(config.development);
    fastify.decorate("knex", db);

    fastify.addHook("onClose", async (instance) => {
      if (instance.knex === db) {
        await instance.knex.destroy();
      }
    });
  }
};

export default fp(knexPlugin);
