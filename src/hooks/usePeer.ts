import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { peerConnection } from "../lib/peer";

export default function usePeer() {
  
  const peer = useRef<Peer | undefined>();
  const [starting, setStarting] = useState<boolean>(true);

  useEffect(() => {
    startPeer();
  }, []);

  async function startPeer() {
    await peerConnection.startSession();
    peer.current = peerConnection.getPeer();
    setStarting(false);
  }

  return { peer: peer.current, starting };
}
