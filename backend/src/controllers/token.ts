import { FastifyReply, FastifyRequest } from "fastify";
import * as qrcode from "qrcode";
import * as crypto from "crypto";
import { Prisma } from "@prisma/client";

function generateRandomByte(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

export const generateTokenHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = generateRandomByte(16);
  const qrCode = await qrcode.toBuffer(token, { width: 512 });
  const { point } = request.body as { point: number };

  try {
    const tokenData = await request.server.prisma.trashCode.create({
      data: {
        token,
        point: point || 0,
      },
    });

    reply.send({
      statusCode: 201,
      code: "CREATED",
      data: {
        token: tokenData,
        qrCode: qrCode.toString("base64"),
      },
    });
  } catch (error) {
    return reply.code(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};

export const validateTokenHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { tokens, trashBinId } = request.body as { tokens: string[]; trashBinId: string };

  try {
    const rewardCode = await request.server.prisma.$transaction(async (tx) => {
      const trashCode = await tx.trashCode.updateManyAndReturn({
        where: {
          token: { in: tokens },
          redeemedAt: null,
        },
        data: { redeemedAt: new Date() },
      });

      const rewards = await tx.rewardToken.createManyAndReturn({
        data: trashCode.map((trash) => ({
          tokenId: trash.id,
          rewardHash: generateRandomByte(16),
          trashBinId: trashBinId,
        })),
      });

      return rewards;
    });

    if (!rewardCode) {
      return reply.status(400).send({
        statusCode: 400,
        code: "INVALID_TOKEN",
        error: "Invalid or already redeemed token",
        message: "Invalid or already redeemed token",
      });
    }

    const rewardCodeString = rewardCode.map((reward) => reward.rewardHash).join(",");
    const rewardQRCode = await qrcode.toBuffer(rewardCodeString, { width: 512 });

    return reply.send({
      statusCode: 200,
      code: "OK",
      data: {
        rewardQRCode: rewardQRCode.toString("base64"),
      },
    });
  } catch (error) {
    return reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "Internal server error",
    });
  }
};

export const redeemTokenHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { tokens } = request.body as { tokens: string[] };
  const user = request.user as { userId: string };
  const userId = user.userId;

  try {
    const result = await request.server.prisma.$transaction(async (tx) => {
      const redeemableTokens = await tx.rewardToken.findMany({
        where: {
          rewardHash: { in: tokens },
          redeemedAt: null,
        },
        include: {
          TrashCode: true,
        },
      });

      const totalPoint = redeemableTokens.reduce(
        (acc, token) => acc + (token.TrashCode.point || 0),
        0
      );

      await tx.user.update({
        where: { id: userId },
        data: {
          point: {
            increment: totalPoint,
          },
        },
      });

      const trx = await tx.pointTransaction.create({
        data: {
          userId: userId,
          type: "IN",
          point: totalPoint,
          title: "Penukaran Token Sampah",
          description: `Menukar ${redeemableTokens.length} token`,
        },
      });

      await tx.pointTransactionDetail.createMany({
        data: redeemableTokens.map((token) => ({
          pointTransactionId: trx.id,
          trashCodeId: token.id,
          rewardTokenId: token.id,
          trashBinId: token.trashBinId,
        })),
      });

      return {
        trx,
        tokens: redeemableTokens,
      };
    });

    return reply.send({
      statusCode: 200,
      code: "OK",
      data: {
        totalPoint: result.trx.point,
        totalTokens: result.tokens.length,
        redeemedTokens: result.tokens,
        invalidTokens: tokens.filter(
          (token) => !result.tokens.some((redeemableToken) => redeemableToken.rewardHash === token)
        ),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return reply.status(400).send({
          statusCode: 400,
          code: "INVALID_TOKEN",
          error: "Invalid or already redeemed token",
          message: "Invalid or already redeemed token",
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
