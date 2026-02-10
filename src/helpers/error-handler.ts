import { BadRequest } from "@/routes/_errors/bad-request";
import { FastifyInstance } from "fastify";
import { ZodError } from "zod";


type FastifyErrorHandler = FastifyInstance['errorHandler']
const ZOD_FASTIFY_ERROR = Symbol.for('ZodFastifySchemaValidationError')

  
export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

  if (
    error?.code === 'FST_ERR_VALIDATION' &&
    error.validation?.[0]?.[ZOD_FASTIFY_ERROR]
  ) {
    const formattedErrors = error.validation.map(err => ({
      field: err.instancePath.replace('/', ''),
      message: err.message,
    }))

    return reply.status(400).send({
      message: 'Validation error',
      errors: formattedErrors,
    })
  }

  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error'})
}