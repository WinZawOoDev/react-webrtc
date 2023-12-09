import { Card } from './components/ui/card'
import './App.css'
import { useState } from 'react'
import { Toaster } from './components/ui/toaster'
import CallForm from './components/CallForm'
import LocalId from './components/LocalId'
import VideoFrame from './components/videoFrame'
import { useWebRTC } from './hooks/useWebRTC'
import Calling from './components/Calling'
import { Alert, AlertDescription } from './components/ui/alert'
import { IoAlertCircleOutline } from 'react-icons/io5'

function App() {

  const { ids, medias, refs } = useWebRTC();
  const [appState, setAppState] = useState({ alert: false, isAnswer: false });

  function handleCall(remoteID: string) {
    if (ids.remote === ids.local) {
      setAppState(prev => ({ ...prev, alert: true }))
      return;
    }
    medias.call(remoteID)
  }

  function handleAnswer() {
    medias.answer();
    setAppState(prev => ({ ...prev, isAnswer: true }));
  }

  function handleHandUp() {
    medias.handUp();
    if (appState.isAnswer) {
      setAppState(prev => ({ ...prev, isAnswer: false }));
    }
  }

  return (
    <main className='relative flex-1 flex-col h-screen w-screen p-10 bg-gray-50 '>
      <div className='mx-auto w-full lg:max-w-4xl'>
        
        <h2 className='my-3 text-center text-2xl font-bold'>Web RTC Test</h2>
        {appState.alert && (
          <Alert variant="destructive" className='mx-auto'>
            <AlertDescription className='flex items-center'>
              <span className='mr-2 text-2xl'>
                <IoAlertCircleOutline />
              </span>
              <span className='font-semibold'>
                ID must be remoteID
              </span>
            </AlertDescription>
          </Alert>
        )}

        <Card className='mx-auto my-2 p-4'>
          <CallForm
            disableSubmit={!ids.local}
            handleSubmit={handleCall}
          />
          <LocalId
            disabled={!ids.local}
            peerId={ids.local}
          />
        </Card>

        <div className='my-10 md:flex justify-center items-center'>
          <VideoFrame videoRef={refs.remoteVideo} />
          <VideoFrame videoRef={refs.localVideo} />
        </div>

        <Calling
          isCalling={medias.isCalling && !appState.isAnswer}
          callerID={ids.remote!}
          handleAnswer={handleAnswer}
          handleHandUp={handleHandUp}
        />

        <Toaster />

      </div>
    </main>
  )
}

export default App
