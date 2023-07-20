'use client'

import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormProps, formSchema } from './constants'

export default function ConversationPage() {
   const form = useForm<FormProps>({
      resolver: zodResolver(formSchema),
      defaultValues: { prompt: '' },
   })

   const isLoading = useMemo(
      () => form.formState.isSubmitting,
      [form.formState.isSubmitting]
   )

   const onSubmit: SubmitHandler<FormProps> = useCallback(async (values) => {
      console.log(values)
   }, [])

   return (
      <article>
         <Heading.Root ariaLabel="conversation">
            <Heading.Icon
               icon={MessageSquare}
               iconColor="text-violet-500"
               bgColor="bg-violet-500/10"
            />
            <Heading.Content
               title="Conversação"
               description="Nosso modelo de conversa mais avançado."
            />
         </Heading.Root>
         <div className="px-4 lg:px-8">
            <div aria-label="conversation-form">
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                  >
                     <FormField
                        name="prompt"
                        render={({ field }) => (
                           <FormItem className="col-span-12 lg:col-span-10">
                              <FormControl className="m-0 p-0">
                                 <Input
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="Como calcular o raio de um círculo?"
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <Button
                        className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading}
                     >
                        Gerar
                     </Button>
                  </form>
               </Form>
            </div>
            <section
               aria-label="conversation-message-content"
               className="space-y-4 mt-4"
            >
               Message Content
            </section>
         </div>
      </article>
   )
}
