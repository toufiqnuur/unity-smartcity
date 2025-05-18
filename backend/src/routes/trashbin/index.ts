import { FastifyPluginAsync } from "fastify";
import { trashBinListSchema } from "../../schema/trashbin.js";
import { getNearTrashBinHandler } from "../../controllers/trashbin.js";

const trashbin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/maps", { schema: trashBinListSchema }, getNearTrashBinHandler);
};

export default trashbin;
