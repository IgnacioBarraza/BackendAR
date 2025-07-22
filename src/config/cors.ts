import { CorsOptions } from 'cors'

const corsOptions: CorsOptions = {
  origin: '*', // Allow all origins for now, can be restricted later
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

export default corsOptions
