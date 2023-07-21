'use client'

import { Empty } from '@/components/Empty'
import { FormCustom } from '@/components/Form'
import { Heading } from '@/components/Heading'
import { Loader } from '@/components/Loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Music } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormProps, formSchema } from './constants'

export default function MusicPage() {
   const [music, setMusic] = useState<string>()

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
            setMusic(undefined)

            const { data } = await axios.post('/api/music', values)

            setMusic(data.audio)

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
         <Heading.Root ariaLabel="music">
            <Heading.Icon
               icon={Music}
               iconColor="text-emerald-500"
               bgColor="bg-emerald-500/10"
            />
            <Heading.Content
               title="Geração musical"
               description="Transforme seu texto em música."
            />
         </Heading.Root>
         <div className="px-4 lg:px-8" aria-label="music-form">
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
                                 placeholder="Piano solo"
                                 {...field}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  <FormCustom.Button
                     label="Gerar"
                     type="submit"
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
            {!music && !isLoading && <Empty label="Nenhuma música gerada." />}
            {music && (
               <audio controls className="w-full mt-8">
                  <source src={music} />
               </audio>
            )}
         </div>
      </article>
   )
}
