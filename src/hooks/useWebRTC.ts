import Peer, { MediaConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

type rtcStateType = {
  peerId: string;
  connection: MediaConnection | undefined;
};

export function useWebRTC() {
  const [rtcState, setRtcState] = useState<rtcStateType>({
    peerId: "",
    connection: undefined,
  });

  const peerInstance = useRef<Peer | undefined>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer({ debug: 2 });
    peer.on("open", function (id: string) {
      setRtcState((prev) => ({ ...prev, peerId: id }));
    });
    peerInstance.current = peer;
    peer.on("call", (connection: MediaConnection) => {
      setRtcState((prev) => ({ ...prev, connection }));
    });
  }, []);

  async function call(remoteId: string) {
    const localStream = await getMediaStream();
    streamVideo(localVideoRef, localStream);
    const call = peerInstance.current?.call(remoteId, localStream);
    call?.on("stream", (remoteStream: MediaStream) => {
      streamVideo(remoteVideoRef, remoteStream);
    });
  }

  async function answer() {
    const localStream = await getMediaStream();
    streamVideo(localVideoRef, localStream);
    rtcState.connection?.answer(localStream);
    rtcState.connection?.on("stream", (remoteStream: MediaStream) => {
      streamVideo(remoteVideoRef, remoteStream);
    });
  }

  function handUp() {
    setRtcState((prev) => ({
      ...prev,
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
    ids: { local: rtcState.peerId, remote: rtcState.connection?.peer },
    refs: { localVideo: localVideoRef, remoteVideo: remoteVideoRef },
    medias: { isCalling: !!rtcState.connection, call, answer, handUp },
  };
}
