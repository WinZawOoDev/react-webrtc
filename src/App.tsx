import { Card } from './components/ui/card'
import './App.css'
import { useRef, useState } from 'react'
import { Toaster } from './components/ui/toaster'
import CallForm from './components/CallForm'
import LocalId from './components/LocalId'
import VideoFrame from './components/videoFrame'
import { useWebRTC } from './hooks/useWebRTC'
import Calling from './components/Calling'
import { Alert, AlertDescription } from './components/ui/alert'
import { IoAlertCircleOutline } from 'react-icons/io5'

function App() {

  const {
    starting,
    localID,
    remoteID,
    mediasCall,
    mediasAnswer,
    mediasHandUp,
    isCalling,
    localVideoRef,
    remoteVideoRef
  } = useWebRTC();
  const peerIDRef = useRef<HTMLSpanElement>(null);
  const [sameIdAlert, setSameIdAlert] = useState(false);

  return (
    <main className='relative flex-1 flex-col h-screen w-screen p-10 bg-gray-50'>
      <h2 className='my-3 text-center text-2xl font-bold'>Web RTC Test</h2>
      {sameIdAlert && (
        <Alert variant="destructive">
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

      <Card className='mx-auto my-2 p-4 lg:max-w-4xl'>
        <CallForm
          disableSubmit={starting}
          handleCall={(remoteID) => {
            if(remoteID === localID){
              setSameIdAlert(true);
              return;
            }
            mediasCall(remoteID)
        }}
        />
        <LocalId
          peerIDRef={peerIDRef}
          starting={starting}
          peerId={localID}
        />
      </Card>
      <div className='my-10 lg:flex justify-center items-center'>
        <div className='m-2'>
          <VideoFrame
            videoRef={localVideoRef}
          />
        </div>
        <div className='m-2'>
          <VideoFrame
            videoRef={remoteVideoRef}
          />
        </div>
      </div>
      <Calling
        isCalling={isCalling}
        callerID={remoteID!}
        handleAnswer={mediasAnswer}
        handleHandUp={mediasHandUp}
      />
      <Toaster />
    </main>
  )
}

export default App
