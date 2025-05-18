import { baseResponse, errorResponse } from "./common.js";

export const generateTokenSchema = {
  summary: "Generate a token",
  tags: ["Token"],
  body: {
    type: "object",
    required: ["point"],
    properties: {
      point: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            token: { type: "string" },
            qrCode: { type: "string" },
          },
        },
      },
    },
    500: errorResponse,
  },
};

export const validateTokenSchema = {
  summary: "Validate a token",
  tags: ["Token"],
  body: {
    type: "object",
    required: ["tokens", "trashBinId"],
    properties: {
      tokens: {
        type: "array",
        items: { type: "string" },
      },
      trashBinId: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            rewardQRCode: { type: "string" },
          },
        },
      },
    },
    500: errorResponse,
  },
};

export const redeemTokenSchema = {
  summary: "Redeem a token",
  tags: ["Token"],
  body: {
    type: "object",
    required: ["tokens"],
    properties: {
      tokens: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            totalPoint: { type: "number" },
            totalTokens: { type: "number" },
            redeemedTokens: { type: "array", items: { type: "string" } },
            invalidTokens: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
    400: errorResponse,
    500: errorResponse,
  },
};
