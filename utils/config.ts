require('dotenv').config()

const PORT = Number(process.env.PORT) || 3000
const MONGODB_URI = process.env.MONGODB_URL ?? 'mongodb://localhost:27017/dt-task1'

export {
    MONGODB_URI,
    PORT
}
