import Peer from "peerjs";
import { useEffect, useState } from "react";
import { peerConnection } from "../lib/peer";

export default function usePeer() {
  const [peer, setPeer] = useState<Peer | undefined>();
  const [starting, setStarting] = useState<boolean>(true);

  useEffect(() => {
    startPeer();
  }, []);

  async function startPeer() {
    await peerConnection.startSession();
    setPeer(peerConnection.getPeer());
    setStarting(false);
  }

  return { peer, starting };
}
