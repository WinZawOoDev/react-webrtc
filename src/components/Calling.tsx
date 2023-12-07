import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/dialog"
import { Button } from './ui/button'
import { FaPhone } from 'react-icons/fa'

type Props = {
    isCalling: boolean,
    handleAnswer: () => void,
    handleHandUp: () => void,
    callerID: string,
}

export default function Calling({ isCalling, handleAnswer, handleHandUp, callerID }: Props) {
    return (
        <Dialog open={isCalling}>
            <DialogContent className="max-w-fit">
                <DialogHeader className="items-center">
                    <DialogTitle className="my-2">Calling ...</DialogTitle>
                    <DialogDescription>
                        <span>RemoteID : </span>
                        <span className="font-bold text-gray-800">{callerID}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-around my-4">
                    <Button onClick={() => handleHandUp()} className='mx-6 rounded-full'>
                        <span className='transform -rotate-[135deg] text-xl'>
                            <FaPhone />
                        </span>
                    </Button>
                    <Button onClick={() => handleAnswer()} className='mx-6 rounded-full'>
                        <span className='text-xl'>
                            <FaPhone />
                        </span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}
