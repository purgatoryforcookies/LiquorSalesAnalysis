import { z } from 'zod';


const liquorFields = z.object({
    name: z.array(z.string()),
    pack: z.array(z.number()),
    vol_ml: z.array(z.number()),
    category: z.array(z.string()),
})


export const LiquorSchema = z.object({
    _id: z.string(),
    _score: z.number(),
    _index: z.string(),
    fields: liquorFields
}).array()

export type TLiquorSearchResults = z.infer<typeof LiquorSchema>

export type TLiquor = z.infer<typeof LiquorSchema>[0]

export type TLiquorFields = z.infer<typeof liquorFields>

