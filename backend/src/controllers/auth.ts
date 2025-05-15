import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = request.body as Record<string, string>;

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return reply.send({
      status: "success",
      message: "User created successfully",
      data: { user },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return reply
          .status(409)
          .send({ status: "error", message: "User already exists", code: "USER_EXISTS" });
      }
    }
    return reply
      .status(500)
      .send({ status: "error", message: "Internal server error", code: "INTERNAL_SERVER_ERROR" });
  }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as Record<string, string>;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user || !(await argon2.verify(user.password, password))) {
    return reply
      .status(401)
      .send({ status: "error", message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
  }

  const access_token = request.server.jwt.sign({ userId: user.id }, { expiresIn: "15m" });
  const refresh_token = request.server.jwt.sign({ userId: user.id }, { expiresIn: "7d" });

  await prisma.refreshToken.create({
    data: { token: refresh_token, userId: user.id },
  });

  return reply.send({
    status: "success",
    message: "Login successful",
    data: { user, access_token, refresh_token },
  });
};

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.userId;

  if (!userId) {
    return reply.status(401).send({
      status: "error",
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return reply.send({
      status: "success",
      message: "User profile retrieved successfully",
      data: { user },
    });
  } catch {
    return reply
      .status(401)
      .send({ status: "error", message: "Invalid token", code: "INVALID_TOKEN" });
  }
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  // TODO: Implement logout logic

  return reply.send({ message: "Logged out" });
};

export const refreshToken = async (
  request: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply
) => {
  // TODO: Implement refresh token logic

  return reply.send({ message: "Token refreshed" });
};
