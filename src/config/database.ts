import * as mongoose from 'mongoose'

require('dotenv').config()


mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`);

export default mongoose