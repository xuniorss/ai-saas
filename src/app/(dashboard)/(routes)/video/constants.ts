import { z } from 'zod'

export const formSchema = z.object({
   prompt: z.string().min(1, {
      message: 'Prompt is required.',
   }),
})

export type FormProps = z.infer<typeof formSchema>
