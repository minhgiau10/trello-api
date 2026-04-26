

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


//intialize a trelloDatabaseInstance is null ( because we have not connected to database yet)
let trelloDatabaseInstance = null


//intialize a mongoClientInstance instance to connect MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Connect to Databse
export const CONNECT_DB = async () => {
  // connect to MongoDB Atlas
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Attention we should sure call when connect finished to MongoDb
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect database first')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}