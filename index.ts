import eventsRouter from './controllers/events'
import express from "express";
import { PORT } from './utils/config';
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./utils/config";
const app = express()
app.use(express.json())

app.use('/api/v3/app/events', eventsRouter)

const dbClient = new MongoClient(MONGODB_URI);

const database = dbClient.db('dt-task1');
const eventsCollection = database.collection('events');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export { dbClient, eventsCollection };
