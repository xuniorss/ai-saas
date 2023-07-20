import { z } from 'zod'

export const formSchema = z.object({
   prompt: z.string().min(1, { message: 'Prompt é obrigatório' }),
})

export type FormProps = z.infer<typeof formSchema>
