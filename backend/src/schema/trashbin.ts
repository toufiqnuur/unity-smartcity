import { baseResponse, errorResponse } from "./common.js";

export const trashBinListSchema = {
  summary: "List Trashbins",
  tags: ["Trashbin"],
  querystring: {
    type: "object",
    required: ["lat", "lng", "distance"],
    properties: {
      lat: { type: "number" },
      lng: { type: "number" },
      distance: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              status: { type: "string" },
              location: { type: "string" },
              description: { type: "string" },
              latitude: { type: "number" },
              longitude: { type: "number" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
  500: errorResponse,
};
