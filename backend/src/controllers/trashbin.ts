import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

function getBoundingBox(
  lat: number,
  lng: number,
  distance: number
): { minLat: number; maxLat: number; minLng: number; maxLng: number } {
  const earthRadius = 6371; // Earth's radius in kilometers
  const latRadian = (lat * Math.PI) / 180;
  const latDistance = distance / earthRadius;
  const lngDistance = distance / (earthRadius * Math.cos(latRadian));

  return {
    minLat: lat - (latDistance * 180) / Math.PI,
    maxLat: lat + (latDistance * 180) / Math.PI,
    minLng: lng - (lngDistance * 180) / Math.PI,
    maxLng: lng + (lngDistance * 180) / Math.PI,
  };
}

export const getNearTrashBinHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { lat, lng, distance } = request.query as {
    lat: string;
    lng: string;
    distance: string;
  };
  const latNumber = parseFloat(lat);
  const lngNumber = parseFloat(lng);
  const distanceNumber = parseFloat(distance);

  const { minLat, maxLat, minLng, maxLng } = getBoundingBox(latNumber, lngNumber, distanceNumber);

  const minLatDecimal = new Prisma.Decimal(minLat);
  const maxLatDecimal = new Prisma.Decimal(maxLat);
  const minLngDecimal = new Prisma.Decimal(minLng);
  const maxLngDecimal = new Prisma.Decimal(maxLng);

  try {
    const locations = await request.server.prisma.trashBin.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: minLatDecimal,
              lte: maxLatDecimal,
            },
          },
          {
            longitude: {
              gte: minLngDecimal,
              lte: maxLngDecimal,
            },
          },
        ],
      },
    });
    reply.send({
      statusCode: 200,
      code: "OK",
      data: locations,
    });
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      message: "An error occurred",
    });
  }
};
