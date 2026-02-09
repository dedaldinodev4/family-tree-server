import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { MomentSchema } from "@/schemas/moment.schema";


export const getAllMoments = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/moments', {
      schema: {
        summary: "Get all moments",
        tags: ['moments'],
        response: {
          200: z.object({
            data: z.array(MomentSchema)
          })
        },
      },
    }, async (request, reply) => {
      const moments = await prisma.moment.findMany({})

      return reply.status(200).send({
        data: moments
      })
    })
}