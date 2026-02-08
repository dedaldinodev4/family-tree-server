import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { CreateMomentSchema } from "@/schemas/moment.schema";


export const createMoment = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/moments', {
      schema: {
        body: CreateMomentSchema,
        response: {
          201: z.object({
            momentId: z.string()
          })
        },
      },
    },

      async (request, reply) => {

        const { title, date, images } = CreateMomentSchema.parse(request.body)


        const moment = await prisma.moment.create({
          data: {
            title,
            date,
            images
          }
        })

        return reply.status(201).send({ momentId: moment.id })
      })

}