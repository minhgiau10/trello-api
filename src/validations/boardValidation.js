import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (trungquandev)',
      'string.empty': 'Title is not allowed to be empty (trungquandev)',
      'string.min': 'Title min 3 chars (trungquandev)',
      'string.max': 'Title max 50 chars (trungquandev)',
      'string.trim': 'Title must not have leading or trailing whitespace (trungquandev)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log(req.body)
    //set abortEarly: false in case of a lot of errors validation , return all the errors instead of one
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    //Validate data succesfull we step from request to next Controller
    next()

  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}