import { Router } from "express";
import { ObjectId } from "mongodb";
import { EventSchema } from "../models";
import { z } from 'zod'
import * as httpStatus from 'http-status'
import { eventsCollection } from "..";

const eventsRouter = Router();

eventsRouter.get('/:id', async (req, res) => {
    const ID = req.params.id;
    const event = await eventsCollection.findOne({ _id: new ObjectId(ID) })
    if (!event) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid event ID`, details: `No event found with ID: ${ID}` })
    }
    res.json(event)
})


eventsRouter.get('/', async (req, res) => {
    const idResult = z.string().safeParse(req.query.id)
    if (idResult.success) {
        const ID = idResult.data
        const event = await eventsCollection.findOne({ _id: new ObjectId(ID) })
        if (!event) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid event ID", details: `No event found with ID: ${ID}` })
        }
        return res.json(event)
    }

    const eventType = req.query.type ?? 'latest'
    const limit = Number(req.query.limit) || 5
    const page = Number(req.query.page) || 1

    const events = await eventsCollection.find({}).limit(limit).skip((page - 1) * limit).sort({ schedule: -1 }).toArray()
    res.json(events)

})

eventsRouter.post('/', async (req, res) => {

    const parseResult = EventSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid Event Data`, details: parseResult.error })
    }

    const result = await eventsCollection.insertOne(parseResult.data)

    res.json({ id: result.insertedId })
})

eventsRouter.put('/:id', async (req, res) => {
    const ID = req.params.id
    const parseResult = EventSchema.partial().safeParse(req.body)
    if (!parseResult.success) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: `Invalid Event Data`, details: parseResult.error })
    }

    const event = await eventsCollection.updateOne({ _id: new ObjectId(ID) }, { $set: req.body })
    if (event.upsertedCount !== 1) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid event ID`, details: `No event found with ID: ${ID}` })
    }
    res.json({ success: true })
})

eventsRouter.delete('/:id', async (req, res) => {
    const ID = req.params.id
    const event = await eventsCollection.deleteOne({ _id: new ObjectId(ID) })

    if (event.deletedCount !== 1) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid event ID`, details: `No event found with ID: ${ID}` })
    }
    res.json({ success: true })
})

export default eventsRouter;