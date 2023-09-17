import { z } from 'zod'

const envsSchema = z.object({
    VITE_UPLOAD_AI_API: z.string()
})

console.log(import.meta.env)

export const envs = envsSchema.parse(import.meta.env)