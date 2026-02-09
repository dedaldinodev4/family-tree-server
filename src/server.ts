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
import { updateMember } from "./routes/update-member";
import { deleteMember } from "./routes/delete-member";

import { createMoment } from "./routes/create-moment";
import { getAllMoments } from "./routes/get-all-moments";
import { getOneMoment } from "./routes/get-one-moment";
import { errorHandler } from "./helpers/error-handler";



const server = fastify({
  logger: false
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

//* swagger *//
server.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.3',
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

//* Members routes *//
server.register(createMember);
server.register(getAllMembers);
server.register(getOneMember);
server.register(updateMember);
server.register(deleteMember);

//* Moments routes *//
server.register(createMoment);
server.register(getAllMoments);
server.register(getOneMoment);

server.setErrorHandler(errorHandler);

server.get('/', function (req, reply) {
  return reply.send('Hello API')
})

export { server }