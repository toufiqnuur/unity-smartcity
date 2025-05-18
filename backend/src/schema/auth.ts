import { baseResponse, errorResponse, headerAuth } from "./common.js";

const userProperties = {
  id: { type: "string" },
  name: { type: "string" },
  email: { type: "string", format: "email" },
  photo: { type: "string" },
  point: { type: "number" },
  createdAt: { type: "string", format: "date-time" },
};

const tokenProperties = {
  access_token: { type: "string" },
  refresh_token: { type: "string" },
};

export const registerSchema = {
  summary: "Register user",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: userProperties,
            },
            ...tokenProperties,
          },
        },
      },
    },
    409: errorResponse,
    500: errorResponse,
  },
};

export const loginSchema = {
  summary: "Login user",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
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
            user: {
              type: "object",
              properties: userProperties,
            },
            ...tokenProperties,
          },
        },
      },
    },
    401: errorResponse,
    500: errorResponse,
  },
};

export const meSchema = {
  summary: "Get user profile",
  tags: ["Auth"],
  headers: headerAuth,
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: userProperties,
            },
          },
        },
      },
    },
    500: errorResponse,
  },
};

export const logoutSchema = {
  summary: "Logout user",
  tags: ["Auth"],
  headers: headerAuth,
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        message: { type: "string" },
      },
    },
    401: errorResponse,
    500: errorResponse,
  },
};

export const refreshTokenSchema = {
  summary: "Refresh access token",
  tags: ["Auth"],
  headers: headerAuth,
  response: {
    200: {
      type: "object",
      properties: {
        ...baseResponse,
        data: {
          type: "object",
          properties: {
            ...tokenProperties,
          },
        },
      },
    },
    401: errorResponse,
    500: errorResponse,
  },
};
