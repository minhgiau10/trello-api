import { slugify } from '../utils/formatters.js'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {

    //treate logic data
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // call to model to treat recordnewBoard in database
    // return result , in service always return
    return newBoard
  } catch (error) {
  }
}

export const boardService = {
  createNew
} 