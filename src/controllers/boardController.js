import { StatusCodes } from 'http-status-codes'
const createNew = async (req, res, next) => {
  try {
    console.log(req.body)


    //control data to Service

    //if have the result we'll return Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: new Error(error).message
    })
  }
}

export const boardController = {
  createNew
}