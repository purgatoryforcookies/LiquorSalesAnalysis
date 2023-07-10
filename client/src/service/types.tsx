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

const liquorStats = z.object({
    busiest_store_id: z.number(),
    item_number: z.number(),
    price_avg_usd: z.number(),
    sold_liters: z.number(),
    store_city: z.string(),
    store_count: z.number(),
    store_name: z.string(),
})
export const EngineSchema = z.object({
    result: LiquorSchema,
    engine: LiquorSchema,
    stats: liquorStats
})


export type TLiquorSearchResults = z.infer<typeof LiquorSchema>
export type TLiquor = z.infer<typeof LiquorSchema>[0]
export type TLiquorFields = z.infer<typeof liquorFields>

export type TEngineResults = z.infer<typeof EngineSchema>
export type TLiquorStats = z.infer<typeof liquorStats>
