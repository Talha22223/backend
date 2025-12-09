import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }))
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }))

app.use(morgan('combined'))

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api', routes)

app.use(errorHandler)

export default app
