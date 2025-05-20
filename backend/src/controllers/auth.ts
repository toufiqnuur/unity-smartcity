import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import argon2 from "argon2";

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = request.body as Record<string, string>;

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await request.server.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return reply.send({
      statusCode: 201,
      code: "CREATED",
      data: { user },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return reply.status(409).send({
          statusCode: 409,
          code: "EMAIL_ALREADY_EXISTS",
          error: "Conflict",
          message: "Email already exists",
        });
      }
    }

    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as Record<string, string>;

  try {
    const user = await request.server.prisma.user.findUnique({ where: { email } });

    if (!user || !(await argon2.verify(user.password, password))) {
      return reply.status(401).send({
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }

    const access_token = request.server.jwt.sign({ userId: user.id }, { expiresIn: "15m" });
    const refresh_token = request.server.jwt.sign({ userId: user.id }, { expiresIn: "7d" });

    await request.server.prisma.refreshToken.upsert({
      where: { userId: user.id },
      update: {
        token: refresh_token,
        updatedAt: new Date(),
      },
      create: {
        token: refresh_token,
        userId: user.id,
      },
    });

    return reply.send({
      statusCode: 200,
      code: "OK",
      data: { user, access_token, refresh_token },
    });
  } catch (error) {
    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};

export const userProfileHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { userId?: string };
  const userId = user.userId;

  try {
    const user = await request.server.prisma.user.findUnique({ where: { id: userId } });
    return reply.send({
      statusCode: 200,
      code: "OK",
      data: { user },
    });
  } catch {
    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};

export const logoutHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { userId?: string };
  const userId = user.userId;

  try {
    await request.server.prisma.refreshToken.update({
      where: { userId, NOT: { token: "" } },
      data: { token: "", updatedAt: new Date() },
    });

    return reply.send({
      statusCode: 200,
      code: "OK",
      message: "Logout successful",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return reply.status(401).send({
          statusCode: 401,
          code: "INVALID_REFRESH_TOKEN",
          error: "Unauthorized",
          message: "Invalid refresh token",
        });
      }
    }

    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};

export const refreshTokenHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { userId?: string };
  const userId = user.userId;

  try {
    const access_token = request.server.jwt.sign({ userId }, { expiresIn: "15m" });
    const refresh_token = request.server.jwt.sign({ userId }, { expiresIn: "7d" });

    await request.server.prisma.refreshToken.update({
      where: { userId, NOT: { token: "" } },
      data: { token: refresh_token, updatedAt: new Date() },
    });

    return reply.send({
      statusCode: 200,
      code: "OK",
      data: { access_token, refresh_token },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return reply.status(401).send({
          statusCode: 401,
          code: "INVALID_REFRESH_TOKEN",
          error: "Unauthorized",
          message: "Invalid refresh token",
        });
      }
    }

    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};
