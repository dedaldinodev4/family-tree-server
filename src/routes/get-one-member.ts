import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { MemberSchema } from "@/schemas/member.schema";
import { BadRequest } from "./_errors/bad-request";


export const getOneMember = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/members/:id', {
      schema: {
        summary: "Get a member",
        tags: ['members'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: MemberSchema,
        },
      },
    }, async (request, reply) => {

      const { id } = request.params;
      const member = await prisma.member.findUnique({
        where: {
          id 
        }
      })

      if (!member) {
        throw new BadRequest('member does not exist')
      }

      return reply.status(200).send(member)
    })
}