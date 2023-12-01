import Peer from "peerjs";

//@ts-ignore
window.peer = Peer;

let peerInstance: Peer | undefined;

export const peerConnection = {
  getPeer: () => peerInstance,
  startSession: (): Promise<string> =>
    new Promise((resolve, reject) => {
      try {
        peerInstance = new Peer({ debug: 3 });
        peerInstance
          .on("open", (id) => {
            resolve(id);
          })
          .on("error", (err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),
  closeSesson: (): Promise<void> =>
    new Promise((resolve, reject) => {
      try {
        if (peerInstance) {
          peerInstance.destroy();
          peerInstance = undefined;
        }
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),
};
