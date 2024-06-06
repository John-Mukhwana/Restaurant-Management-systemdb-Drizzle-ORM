import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono! we are running on Node.js')
})
app.get('/ok', (c) => {
  return c.text('The code  is 🥵🥵🥵')
})

app.notFound((c)=>{
  return c.text("Route not found😪",404)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
