import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const ImageNext = ({ src, alt, style, className, objectFit, objectPosition, ...imgProps }) => {
    return (
        <div className={clsx('relative', className)} style={{ ...style }}>
            <Image src={src} alt={alt} objectFit={objectFit} objectPosition={objectPosition} layout='fill' {...imgProps} />
        </div>
    )
}

export default ImageNext