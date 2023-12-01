import { Card } from './components/ui/card'
import './App.css'
import usePeer from './hooks/usePeer'
import { useEffect, useRef } from 'react'
import { Toaster } from './components/ui/toaster'
import CallForm from './components/CallForm'
import LocalId from './components/LocalId'
import VideoFrame from './components/videoFrame'

function App() {

  const { peer, starting } = usePeer();
  const peerIDRef = useRef<HTMLSpanElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    peer?.on("call", async (call) => {
      console.log("calling")
      const localStream = await getMediaStream();
      call.answer(localStream)
    })
  }, [])

  async function mediasCall(remoteID: string) {
    console.log(remoteID);
    const localStream = await getMediaStream();
    // console.log(peer);
    const call = peer?.call(remoteID, localStream);
    // console.log(call);
    call?.on("stream", (remoteStream: MediaStream) => {
      streamVideo(remoteVideoRef, remoteStream);
    })
    streamVideo(localVideoRef, localStream)
  }

  function getMediaStream() {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  }

  function streamVideo(videoRef: React.RefObject<HTMLVideoElement>, stream: MediaStream) {
    if (videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    }
  }

  return (
    <main className='relative flex-1 flex-col h-screen w-screen p-10 bg-gray-50'>
      <h2 className='text-center text-2xl font-bold'>Web RTC Test</h2>
      <Card className='mx-auto my-5 p-4 lg:max-w-4xl'>
        <CallForm
          disableSubmit={starting}
          handleCall={mediasCall}
        />
        <LocalId
          peerIDRef={peerIDRef}
          starting={starting}
          peerId={peer?.id!}
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
            videoRef={localVideoRef}
          />
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default App
