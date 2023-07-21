'use client'

import { Empty } from '@/components/Empty'
import { FormCustom } from '@/components/Form'
import { Heading } from '@/components/Heading'
import { Loader } from '@/components/Loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormProps, formSchema } from './constants'

export default function VideoPage() {
   const [video, setVideo] = useState<string>()

   const router = useRouter()

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
            setVideo(undefined)

            const { data } = await axios.post('/api/video', values)

            setVideo(data[0])
            form.reset()
         } catch (error) {
            console.error(error)
         } finally {
            router.refresh()
         }
      },
      [form, router]
   )

   return (
      <article>
         <Heading.Root ariaLabel="video">
            <Heading.Icon
               icon={Video}
               iconColor="text-orange-700"
               bgColor="bg-orange-700/10"
            />
            <Heading.Content
               title="Geração de vídeo"
               description="Transforme seu texto em vídeo."
            />
         </Heading.Root>
         <div className="px-4 lg:px-8" aria-label="video-form">
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
                                 placeholder="Peixe-palhaço nadando em um recife de coral"
                                 {...field}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormCustom.Button
                     type="submit"
                     label="Gerar"
                     isDisabled={isLoading}
                     size="icon"
                  />
               </FormCustom.Root>
            </Form>
            {isLoading && (
               <div className="p-20">
                  <Loader />
               </div>
            )}
            {!video && !isLoading && (
               <Empty label="Nenhum arquivo de vídeo gerado." />
            )}
            {video && (
               <video
                  controls
                  className="w-full aspect-video mt-8 rounded-lg border bg-black"
               >
                  <source src={video} />
               </video>
            )}
         </div>
      </article>
   )
}
