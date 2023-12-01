import * as z from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormMessage, Form } from './ui/form'


const formSchema = z.object({
    remoteID: z.string().min(36, "Remote ID required").max(36, "Remote ID required"),
})

export default function CallForm({ disableSubmit, handleCall }: { disableSubmit: boolean, handleCall: (remoteVideoRef: string) => void }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            remoteID: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        handleCall(values.remoteID);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex my-3 items-center justify-between'
            >
                <FormField
                    name='remoteID'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className='relative w-full mr-3'>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='Enter Remote ID'
                                    className='mx-1'
                                />
                            </FormControl>
                            <FormMessage className='absolute -bottom-5 left-1' />
                        </FormItem>
                    )}
                />
                <Button disabled={disableSubmit} className='uppercase text-xs font-bold tracking-wide'>
                    call
                </Button>
            </form>
        </Form>

    )
}
