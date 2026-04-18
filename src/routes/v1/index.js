import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 is ready to use' })
})

// Boards API
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router