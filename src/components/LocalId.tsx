import { FaRegCopy } from "react-icons/fa"
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { useCopyToClipboard } from 'usehooks-ts'
import { useEffect, useRef } from 'react'
import { useToast } from './ui/use-toast'

type Props = {
    disabled: boolean,
    peerId: string,
}

export default function LocalId({ disabled, peerId }: Props) {

    const peerIDRef = useRef<HTMLSpanElement>(null);
    const [value, copy] = useCopyToClipboard();
    const { toast } = useToast();

    useEffect(() => {
        if (value) {
            toast({
                variant: 'default',
                description: `${value} Copied`
            })
        }

    }, [value])


    return (
        <div className='flex my-3 items-center justify-between'>
            {!disabled ?
                <span ref={peerIDRef} className='mx-1 text-center w-full text-sm font-bold tracking-wide'>{peerId}</span>
                : <Skeleton className='h-9 w-full mx-1' />}
            <Button
                onClick={() => copy(peerIDRef.current?.innerText!)}
                disabled={disabled}
                className='px-6 hover:bg-gray-800'
            >
                <span className='text-xl hover:text-gray-500'>
                    <FaRegCopy />
                </span>
            </Button>
        </div>
    )
}
