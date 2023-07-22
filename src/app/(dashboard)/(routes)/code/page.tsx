'use client'

import { BotAvatar } from '@/components/BotAvatar'
import { Empty } from '@/components/Empty'
import { FormCustom } from '@/components/Form'
import { Heading } from '@/components/Heading'
import { Loader } from '@/components/Loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/UserAvatar'
import { useProModal } from '@/hooks/useProModal'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Code } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChatCompletionRequestMessage } from 'openai'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { FormProps, formSchema } from './constants'

export default function CodePage() {
   const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

   const router = useRouter()
   const proModal = useProModal()

   const form = useForm<FormProps>({
      resolver: zodResolver(formSchema),
      defaultValues: { prompt: '' },
   })

   const isLoading = useMemo(
      () => form.formState.isSubmitting,
      [form.formState.isSubmitting]
   )

   const onSubmit: SubmitHandler<FormProps> = useCallback(
      async (values) => {
         try {
            const userMessage: ChatCompletionRequestMessage = {
               role: 'user',
               content: values.prompt,
            }

            const newMessages = [...messages, userMessage]

            const response = await axios.post('/api/code', {
               messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data])

            form.reset()
         } catch (error: any) {
            if (error?.response?.status === 403) proModal.onOpen()
         } finally {
            router.refresh()
         }
      },
      [form, messages, proModal, router]
   )

   return (
      <article>
         <Heading.Root ariaLabel="code">
            <Heading.Icon
               icon={Code}
               iconColor="text-green-700"
               bgColor="bg-green-700/10"
            />
            <Heading.Content
               title="Geração de Código"
               description="Gere código usando texto descritivo."
            />
         </Heading.Root>
         <div className="px-4 lg:px-8">
            <div aria-label="code-form">
               <Form {...form}>
                  <FormCustom.Root onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        name="prompt"
                        render={({ field }) => (
                           <FormItem className="col-span-12 lg:col-span-10">
                              <FormControl className="m-0 p-0">
                                 <Input
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="Toggle button simples usando hooks do React"
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <FormCustom.Button
                        type="submit"
                        isDisabled={isLoading}
                        size="icon"
                        label="Gerar"
                     />
                  </FormCustom.Root>
               </Form>
            </div>
            <section
               aria-label="code-message-container"
               className="space-y-4 mt-4"
            >
               {isLoading && (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                     <Loader />
                  </div>
               )}

               {messages.length === 0 && !isLoading && (
                  <Empty label="Nenhuma conversa começou." />
               )}

               <article
                  aria-label="code-content"
                  className="flex flex-col-reverse gap-y-4"
               >
                  {messages.map((message) => (
                     <div
                        key={message.content}
                        className={cn(
                           'p-8 w-full flex items-start gap-x-8 rounded-lg',
                           message.role === 'user'
                              ? 'bg-white border border-black/10'
                              : 'bg-muted'
                        )}
                     >
                        {message.role === 'user' ? (
                           <UserAvatar />
                        ) : (
                           <BotAvatar />
                        )}
                        <ReactMarkdown
                           components={{
                              pre: ({ node, ...props }) => (
                                 <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                    <pre {...props} />
                                 </div>
                              ),
                              code: ({ node, ...props }) => (
                                 <code
                                    className="bg-black/10 rounded-lg p-1"
                                    {...props}
                                 />
                              ),
                           }}
                           className="text-sm overflow-hidden leading-7"
                        >
                           {message.content || ''}
                        </ReactMarkdown>
                     </div>
                  ))}
               </article>
            </section>
         </div>
      </article>
   )
}
