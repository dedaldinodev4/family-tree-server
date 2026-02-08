import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"


export const deleteMember = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/members/:id', {
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

      if (!member) {
        throw Error('Member does not exist.')
      }

      const deletedMember = await prisma.member.delete({
        where: {
          id 
        }
      })

      return reply.status(204).send({})
    })
}