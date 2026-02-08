import fastify from "fastify";
import { 
  serializerCompiler, 
  validatorCompiler,
  jsonSchemaTransform
} from 'fastify-type-provider-zod';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { createMember } from "./routes/create-member";
import { getAllMembers } from "./routes/get-all-members";
import { getOneMember } from "./routes/get-one-member";


const server = fastify({
  logger: false
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: "Family-tree",
      description: "A minimal backend built",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

server.register(createMember);
//server.register(getAllMembers);
//server.register(getOneMember);

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})

export { server }