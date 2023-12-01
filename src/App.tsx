import { Card } from './components/ui/card'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from './components/ui/toaster'
import CallForm from './components/CallForm'
import LocalId from './components/LocalId'
import VideoFrame from './components/videoFrame'
import Peer from 'peerjs'

function App() {

  const [peerId, setPeerID] = useState("");
  const peerIDRef = useRef<HTMLSpanElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const peerInstance = useRef<Peer | undefined>();
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    setStarting(true);
    const peer = new Peer({ debug: 2 });
    peer.on('open', (id: string) => {
      setPeerID(id);
    })
    peer.on("call", async (call) => {
      console.log("calling")
      const localStream = await getMediaStream();
      call.answer(localStream)
    })
    peerInstance.current = peer;
    setStarting(false);
  }, [])

  async function mediasCall(remoteID: string) {
    console.log(remoteID);
    const localStream = await getMediaStream();
    // console.log(peer);
    const call = peerInstance.current?.call(remoteID, localStream);
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
          peerId={peerId}
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
      <Toaster />
    </main>
  )
}

export default App
