import { Card } from './components/ui/card'
import './App.css'
import usePeer from './hooks/usePeer'
import { useRef } from 'react'
import { Toaster } from './components/ui/toaster'
import CallForm from './components/callForm'
import LocalId from './components/localId'

function App() {

  const { peer, starting } = usePeer();
  const peerIDRef = useRef<HTMLSpanElement>(null);

  return (
    <main className='relative flex-1 flex-col h-screen w-screen p-10 bg-gray-50'>
      <h2 className='text-center text-2xl font-bold'>Web RTC Test</h2>
      <Card className='my-5 p-4'>
        <CallForm />
        <LocalId
          peerIDRef={peerIDRef}
          starting={starting}
          peerId={peer?.id!}
        />
      </Card>
      <Toaster />
    </main>
  )
}

export default App
