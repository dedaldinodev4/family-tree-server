import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import {
  MemberSchema,
  UpdateMemberSchema
} from "@/schemas/member.schema";
import { BadRequest } from "./_errors/bad-request";


export const updateMember = async (app: FastifyInstance) => {

  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/members/:id', {
      schema: {
        summary: "Update a member",
        tags: ['members'],
        body: UpdateMemberSchema,
        params: z.object({
          id: z.string(),
        }),
        response: {
          201: z.object({
            member: MemberSchema
          })
        },
      },
    },

      async (request, reply) => {
        const { id } = request.params;
        const { name,
          birthDate,
          parentId, role,
          phone, photo
        } = UpdateMemberSchema.parse(request.body)


        const member = await prisma.member.findUnique({
          where: {
            id
          }
        })

        if (!member) {
          throw new BadRequest('Member does not exist.')
        }


        const updatedMember = await prisma.member.update({
          where: { id },
          data: {
            name,
            role,
            birthDate,
            parentId,
            phone, photo
          }
        })

        return reply.status(201).send({ member: updatedMember })
      })

}