import Peer, { MediaConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

type appStateType = {
  peerId: string;
  starting: boolean;
  connection: MediaConnection | undefined;
};

export function useWebRTC() {
  const [appState, setAppState] = useState<appStateType>({
    peerId: "",
    starting: false,
    connection: undefined,
  });
  const peerInstance = useRef<Peer | undefined>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer({ debug: 2 });
    peer.on("open", function (id: string) {
      setAppState((prev) => ({ ...prev, peerId: id }));
    });

    peer.on("call", (connection: MediaConnection) => {
      setAppState((prev) => ({ ...prev, connection }));
    });

    peerInstance.current = peer;
  }, []);

  async function mediasCall(remoteId: string) {
    const localStream = await getMediaStream();
    streamVideo(localVideoRef, localStream);
    const call = peerInstance.current?.call(remoteId, localStream);
    call?.on("stream", (remoteStream: MediaStream) => {
      streamVideo(remoteVideoRef, remoteStream);
    });
  }

  async function mediasAnswer() {
    const localStream = await getMediaStream();
    streamVideo(localVideoRef, localStream);
    appState.connection?.answer(localStream);
    appState.connection?.on("stream", (remoteStream: MediaStream) => {
      streamVideo(remoteVideoRef, remoteStream);
    });
  }

  function mediasHandUp() {
    setAppState((prev) => ({
      ...prev,
      peerId: "",
      starting: false,
      connection: undefined,
    }));
    peerInstance.current = undefined;
  }

  function getMediaStream() {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  }

  function streamVideo(
    videoRef: React.RefObject<HTMLVideoElement>,
    stream: MediaStream
  ) {
    if (videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    }
  }

  return {
    starting: appState.starting,
    localID: appState.peerId,
    remoteID: appState.connection?.peer,
    isCalling: !!appState.connection,
    localVideoRef,
    remoteVideoRef,
    mediasCall,
    mediasAnswer,
    mediasHandUp,
    getMediaStream,
  };
}
