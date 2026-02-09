import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { CreateMemberSchema, MemberSchema } from "@/schemas/member.schema";


export const createMember = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/members', {
      schema: {
        summary: "Create a member",
        tags: ['members'],
        body: CreateMemberSchema,
        response: {
          201: z.object({
            memberId: z.string()
          })
        },
      },
    },

      async (request, reply) => {

        const { name,
          birthDate,
          parentId,
          phone, photo
        } = CreateMemberSchema.parse(request.body)


        const member = await prisma.member.create({
          data: {
            name,
            birthDate,
            parentId,
            phone, photo
          }
        })

        return reply.status(201).send({ memberId: member.id })
      })

}