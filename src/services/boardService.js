import { slugify } from '../utils/formatters.js'
import { boardModel } from '../models/boardModel.js'
import ApiError from '~/utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }


    const resBoard = cloneDeep(board)
    // Step 1 : get card to right column
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // Step 2 :Delete cards in board
    delete resBoard.cards
    // return result , in service always return
    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}