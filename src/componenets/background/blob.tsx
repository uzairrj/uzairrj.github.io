import React from "react"
import "./blob.css"
import { motion, useTime, useTransform } from "motion/react"

type BlobStyle = {
    style?: React.CSSProperties;
}

type BlobProps = {
    blobs: BlobStyle[]
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
}

function Blob({blobs, top, left, bottom, right}: BlobProps) {
    const time = useTime()

    return (
        <div className="blob-container" style={{top, left, bottom, right}}>
                {blobs.map((blob, index) => {
                    const randomNumber = Math.random()
                    const rotate = useTransform(time, [0, 20000], [0, 200+(Math.floor(randomNumber)*360)], { clamp: false })
                    const translateX = useTransform(time, t => Math.sin(t/((1000 + randomNumber * 400) + (randomNumber * Math.PI * 2 ))) * (20 + (randomNumber * 50)))
                    const translateY = useTransform(time, t => Math.cos(t/(1000 + randomNumber * 400) ) + (randomNumber * Math.PI * 2 ) * (20+(randomNumber * 30)));
                    return (
                        <motion.div key={index} className="blob" style={{...blob.style, rotate ,x:translateX, y:translateY, transformOrigin: `${45 + (randomNumber * 10)}% ${45 + (randomNumber * 10)}%`}} />
                    )
                })}
        </div>
    )
}

export {Blob}