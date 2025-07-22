import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { initDatabase } from './config/database'
import { sendResponse } from './utils/utils'
import { envConfig } from './config/env-config'
import { authRouter } from './routes/authRoutes'
import { favRouter } from './routes/favoriteRoutes'
import { CustomError, errorHandler } from './middleware/errorHandler'

const app = express()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/favorites', favRouter)

app.use('/healthy', (req: Request, res: Response) => {
  sendResponse(req, res, 'OK', 200)
})

/**
 * Middlewares
 */

app.use(
  (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, req, res)
  }
)

/**
 * Datataba init
 */

initDatabase()
  .then(() => {
    console.log('Database initialized and connected')
    app.listen(envConfig.port || 5000, () => {
      console.log(`🚀🚀 Server running on port: ${envConfig.port} 🚀🚀`)
    })
  })
  .catch((error) => {
    console.error('Error initializing database', error)
    process.exit(1)
  })
