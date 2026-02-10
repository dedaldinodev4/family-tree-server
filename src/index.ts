import { server } from "./server";

try {
  server.listen({ port: 3333, host: '0.0.0.0'}).then(() => {
    console.log(`Server running on port 3333`)  
  })
} catch (err) {
  server.log.error(err) 
  process.exit(1) 
}
