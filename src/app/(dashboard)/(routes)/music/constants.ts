import { z } from 'zod'

export const formSchema = z.object({
   prompt: z.string().min(1, {
      message: 'Music prompt is required',
   }),
})

export type FormProps = z.infer<typeof formSchema>
