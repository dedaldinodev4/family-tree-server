import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"


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
        response: {},
      },
    }, async (request, reply) => {

      const { id } = request.params;
      const moment = await prisma.moment.findUnique({
        where: {
          id 
        }
      })

      if (!moment) {
        throw Error('Moment does not exist.')
      }

      return reply.status(200).send({
        moment
      })
    })
}