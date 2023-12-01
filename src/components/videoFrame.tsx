import React from "react"

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>,
    width?: number,
    height?: number
}

export default function VideoFrame({ videoRef, width = 200, height = 200 }: Props) {
    return (
        <div className='relative'>
            <video
                ref={videoRef}
                width={width}
                height={height}
                autoPlay
                loop
            />
        </div>
    )
}
