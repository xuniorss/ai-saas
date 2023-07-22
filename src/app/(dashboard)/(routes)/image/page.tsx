'use client'

import { Empty } from '@/components/Empty'
import { FormCustom } from '@/components/Form'
import { Heading } from '@/components/Heading'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { useProModal } from '@/hooks/useProModal'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Download, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
   amountOptions,
   FormProps,
   formSchema,
   resolutionOptions,
} from './constants'

export default function ImagePage() {
   const [photos, setPhotos] = useState<string[]>([])

   const router = useRouter()
   const proModal = useProModal()

   const form = useForm<FormProps>({
      resolver: zodResolver(formSchema),
      defaultValues: { prompt: '', amount: '1', resolution: '512x512' },
   })

   const isLoading = useMemo(
      () => form.formState.isSubmitting,
      [form.formState.isSubmitting]
   )

   const onSubmit: SubmitHandler<FormProps> = useCallback(
      async (values) => {
         try {
            setPhotos([])

            const { data } = await axios.post('/api/image', values)
            const urls = data.map((image: { url: string }) => image.url)

            setPhotos(urls)
         } catch (error: any) {
            if (error?.response?.status === 403) proModal.onOpen()
         } finally {
            router.refresh()
         }
      },
      [proModal, router]
   )

   return (
      <article>
         <Heading.Root ariaLabel="images">
            <Heading.Icon
               icon={ImageIcon}
               iconColor="text-pink-700"
               bgColor="bg-pink-700/10"
            />
            <Heading.Content
               title="Geração de imagem"
               description="Transforme seu texto em uma imagem."
            />
         </Heading.Root>
         <div className="px-4 lg:px-8">
            <div aria-label="image-form">
               <Form {...form}>
                  <FormCustom.Root onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        name="prompt"
                        render={({ field }) => (
                           <FormItem className="col-span-12 lg:col-span-6">
                              <FormControl className="m-0 p-0">
                                 <Input
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="Uma foto de um cavalo nos Alpes suíços"
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                           <FormItem className="col-span-12 lg:col-span-2">
                              <Select
                                 disabled={isLoading}
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue
                                          defaultValue={field.value}
                                       />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {amountOptions.map((option) => (
                                       <SelectItem
                                          key={option.value}
                                          value={option.value}
                                       >
                                          {option.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="resolution"
                        render={({ field }) => (
                           <FormItem className="col-span-12 lg:col-span-2">
                              <Select
                                 disabled={isLoading}
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue
                                          defaultValue={field.value}
                                       />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {resolutionOptions.map((option) => (
                                       <SelectItem
                                          key={option.value}
                                          value={option.value}
                                       >
                                          {option.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
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
               {photos.length === 0 && !isLoading && (
                  <Empty label="Nenhuma imagem gerada." />
               )}
               <section
                  aria-label="images-container"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8"
               >
                  {photos.map((src) => (
                     <Card key={src} className="rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                           <Image
                              fill
                              alt="Generated"
                              src={src}
                              loading="lazy"
                           />
                        </div>
                        <CardFooter className="p-2">
                           <Button
                              aria-label="download imagem"
                              onClick={() => window.open(src)}
                              variant="secondary"
                              className="w-full"
                           >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                           </Button>
                        </CardFooter>
                     </Card>
                  ))}
               </section>
            </div>
         </div>
      </article>
   )
}
