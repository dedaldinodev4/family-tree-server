import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { MemberSchema } from "@/schemas/member.schema";


export const getAllMembers = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/members', {
      schema: {
        response: {
          200: z.object({
            data: z.array(MemberSchema)
          })
        },
      },
    }, async (request, reply) => {
      const members = await prisma.member.findMany({})

      return reply.status(200).send({
        data: members
      })
    })
}