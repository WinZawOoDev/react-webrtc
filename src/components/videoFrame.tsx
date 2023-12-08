import React from "react"

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>,
    width?: number,
    height?: number
}

export default function VideoFrame({ videoRef, width = 1000, height = 1000 }: Props) {
    return (
        <div className='relative mx-2 my-1 rounded-lg md:w-1/2 h-fit'>
            <video
                className="rounded-md"
                ref={videoRef}
                width={width}
                height={height}
                autoPlay
                loop
            />
        </div>
    )
}
