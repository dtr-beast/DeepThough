import { z } from "zod";

export const EventSchema = z.object({
    type: z.string(),
    uid: z.string(),
    name: z.string(),
    tagline: z.string(),
    schedule: z.string().refine(val => new Date(val).toString() !== 'Invalid Date', { message: 'Invalid Date' }),
    // Image is Base64 encoded
    image: z.string().optional(),
    description: z.string(),
    moderator: z.number(),
    category: z.string(),
    sub_category: z.string(),
    regor_rank: z.number(),
    attendees: z.array(z.number()),
}).strict()

export type Event = z.infer<typeof EventSchema>