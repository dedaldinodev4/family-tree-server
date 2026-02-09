import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { BadRequest } from "./_errors/bad-request";
import { MomentSchema } from "@/schemas/moment.schema";


export const getOneMoment = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/moments/:id', {
      schema: {
        summary: "Get a moment",
        tags: ['moments'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: MomentSchema
        },
      },
    }, async (request, reply) => {

      const { id } = request.params;
      const moment = await prisma.moment.findUnique({
        where: {
          id 
        }
      })

      if (!moment) {
        throw new BadRequest('Moment does not exist.')
      }

      return reply.status(200).send(moment)
    })
}