import { slugify } from '../utils/formatters.js'
import { boardModel } from '../models/boardModel.js'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {

    //treate logic data
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // call to model to treat record newBoard in database
    const createdBoard = await boardModel.createNew(newBoard)

    //Get record board after call
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // return result , in service always return
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}