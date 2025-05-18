export const baseResponse = {
  statusCode: { type: "number" },
  code: { type: "string" },
};

export const errorResponse = {
  type: "object",
  properties: {
    ...baseResponse,
    error: { type: "string" },
    message: { type: "string" },
  },
};

export const headerAuth = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
