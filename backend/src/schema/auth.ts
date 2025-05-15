export const registerSchema = {
  summary: "Register user",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                username: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                photo: { type: "string" },
              },
            },
            access_token: { type: "string" },
            refresh_token: { type: "string" },
          },
        },
      },
    },
    401: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        code: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        code: { type: "string" },
      },
    },
  },
};

export const loginSchema = {
  summary: "Login user",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                photo: { type: "string" },
                point: { type: "number" },
                createdAt: { type: "string" },
              },
            },
            access_token: { type: "string" },
            refresh_token: { type: "string" },
          },
        },
      },
    },
    401: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        code: { type: "string" },
      },
    },
  },
};

export const meSchema = {
  summary: "Get user profile",
  tags: ["Auth"],
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
                photo: { type: "string" },
                point: { type: "number" },
                createdAt: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  401: {
    type: "object",
    properties: {
      status: { type: "string" },
      message: { type: "string" },
      code: { type: "string" },
    },
  },
  500: {
    type: "object",
    properties: {
      status: { type: "string" },
      message: { type: "string" },
      code: { type: "string" },
    },
  },
};
