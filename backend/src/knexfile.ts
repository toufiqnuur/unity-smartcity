import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config;
