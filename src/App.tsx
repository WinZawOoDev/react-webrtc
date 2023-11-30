import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import './App.css'
import { Input } from './components/ui/input'
import { FaRegCopy } from "react-icons/fa"
import usePeer from './hooks/usePeer'
import { Skeleton } from './components/ui/skeleton'

function App() {

  const { peer, starting } = usePeer();

  return (
    <main className='relative container flex-1 h-screen w-screen p-10 bg-gray-50'>
      <h2 className='text-center text-2xl font-bold'>Web RTC Test</h2>
      <Card className='my-5 p-4 shadow-sm'>
        <div className='flex my-3 items-center justify-between'>
          <Input
            placeholder='Enter Remote ID'
            className='mx-1'
          />
          <Button className='uppercase text-xs font-bold tracking-wide'>
            call
          </Button>
        </div>
        <div className='flex my-3 items-center justify-between'>
          {!starting ?
            <span className='mx-1 text-center w-full text-sm font-bold tracking-wide'>{peer?.id}</span>
            : <Skeleton className='h-9 w-full mx-1' />}
          <Button disabled={starting} className='px-6 hover:bg-gray-800'>
            <span className='text-xl hover:text-gray-500'>
              <FaRegCopy />
            </span>
          </Button>
        </div>
      </Card>
    </main>
  )
}

export default App
