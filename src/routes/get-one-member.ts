import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"


export const getOneMember = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/members/:id', {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {},
      },
    }, async (request, reply) => {

      const { id } = request.params;
      const member = await prisma.member.findUnique({
        where: {
          id 
        }
      })

      return reply.status(200).send({
        member
      })
    })
}